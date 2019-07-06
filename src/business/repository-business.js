import formatter from 'string-template';
import GithubAPI from '../services/github-api';
import { throwError } from '../utils/api-response';
import { ISSUE_TEMPLATE } from '../templates/templates';

const BRANCH_PROTECTION_NAME = 'master';

class RepositoryBusiness {
  static async onRepositoryCreatedHook(hook) {
    const owner = hook.repository.owner.login;
    const repositoryName = hook.repository.name;
    const sender = hook.sender.login;

    // Create master if it doesn't exist
    const exists = await doesBranchExist(owner, repositoryName, BRANCH_PROTECTION_NAME);
    if (!exists) {
      // In the future we could do a commit in the name of the user to create the branch
      throwError(
        'The master branch does not exist so it cannot be protected. Initialize the repo with a README',
        400,
      );
    }
    // Protect the branch
    const protectedInfo = await GithubAPI.protectBranch(
      owner,
      repositoryName,
      BRANCH_PROTECTION_NAME,
      sender,
    );
    // Create the issue
    const issueInfo = await createReportingIssue(
      owner,
      repositoryName,
      protectedInfo,
      sender,
      BRANCH_PROTECTION_NAME,
    );
    //All good, return a summary
    return {
      protectedInfo,
      issueInfo,
    };
  }
}

async function doesBranchExist(owner, repositoryName, branchName) {
  const branch = await GithubAPI.getBranch(owner, repositoryName, branchName);
  return !!branch;
}

async function createReportingIssue(
  owner,
  repositoryName,
  protectionsEnabled,
  senderName,
  branchName,
) {
  const issueTemplate = formatter(ISSUE_TEMPLATE, {
    owner: senderName,
    branch: branchName,
    apiResponse: JSON.stringify(protectionsEnabled, null, 2),
  });
  return await GithubAPI.createIssue(owner, repositoryName, branchName, issueTemplate);
}

export default RepositoryBusiness;

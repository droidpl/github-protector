import axios from 'axios';
import { GITHUB_PERSONAL_TOKEN } from '../utils/env';

export const GITHUB_URL = 'https://api.github.com';

const githubAxios = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_PERSONAL_TOKEN}`,
  },
});

const getBranch = async (owner, repositoryName, branchName) => {
  try {
    const response = await githubAxios.get(
      `/repos/${owner}/${repositoryName}/branches/${branchName}`,
    );
    return response.data;
  } catch (e) {
    return null;
  }
};

const protectBranch = async (owner, repositoryName, branchName, sender) => {
  const { data } = await githubAxios.put(
    `/repos/${owner}/${repositoryName}/branches/${branchName}/protection`,
    {
      required_status_checks: {
        strict: true,
        contexts: ['continuous-integration/jenkins'],
      },
      enforce_admins: true,
      required_pull_request_reviews: {
        dismissal_restrictions: {
          users: [sender],
          teams: [],
        },
        dismiss_stale_reviews: true,
        require_code_owner_reviews: true,
      },
      restrictions: {
        users: [sender],
        teams: [],
      },
    },
  );
  return data;
};

const createIssue = async (owner, repositoryName, branchName, issueTemplate) => {
  const { data } = await githubAxios.post(`/repos/${owner}/${repositoryName}/issues`, {
    title: `Protections enabled on ${branchName}`,
    body: issueTemplate,
  });
  return data;
};

export default {
  protectBranch,
  createIssue,
  getBranch,
};

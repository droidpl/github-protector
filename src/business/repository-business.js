import GithubAPI from '../services/github-api';

class RepositoryBusiness {
  async onRepositoryCreatedHook() {
    // Create master if it doesn't exist
    await this.createMasterBranchIfNotExist();
    // Protect the branch
    await this.protectMaster();
    // Create the issue
    await this.createReportingIssue();
  }

  async createMasterBranchIfNotExist() {
    //TODO
  }

  async createReportingIssue() {
    //TODO
  }

  async protectMaster() {
    //TODO
  }
}

export default new RepositoryBusiness();

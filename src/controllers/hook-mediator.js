import RepositoryBusiness from '../business/repository-business';
import { delayedExecution } from '../utils/utils';
import { throwError } from '../utils/api-response';
import { LOCAL_ENV } from '../utils/env';

const NO_OP = (hookInfo) => ({
  ok: true,
  processed: false,
  ...hookInfo, // eslint-disable-line
});

export default async (hookInfo) => {
  switch (hookInfo.event) {
    case 'repository':
      if (!hookInfo.type) {
        throwError('The type on the repository event is missing', 400);
      }
      if (hookInfo.type === 'created') {
        // This command execution is delayed to wait for the master branch creation
        // Another way would be to listen for master branch creation instead of repo creation,
        // but the test says otherwise.
        return delayedExecution(
          LOCAL_ENV ? 0 : 2000,
          async () => await RepositoryBusiness.onRepositoryCreatedHook(hookInfo.hook),
        );
      } else {
        return NO_OP(hookInfo);
      }
    case 'ping':
    default:
      return NO_OP(hookInfo);
  }
};

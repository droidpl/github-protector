import RepositoryBusiness from '../business/repository-business';

const NO_OP = (hookInfo) => ({
  ok: true,
  processed: false,
  ...hookInfo,
});

export default (hookInfo) => {
  switch (hookInfo.event) {
    case 'repository':
      if (hookInfo.type === 'created') {
        return RepositoryBusiness.onRepositoryCreatedHook(hookInfo);
      } else {
        return NO_OP(hookInfo);
      }
    case 'ping':
    default:
      return NO_OP(hookInfo);
  }
};

import RepositoryBusiness from '../business/repository-business';

const NO_OP = (hookInfo) => ({
  ok: true,
  processed: false,
  ...hookInfo, // eslint-disable-line
});

export default async (hookInfo) => {
  switch (hookInfo.event) {
    case 'repository':
      if (hookInfo.type === 'created') {
        return await RepositoryBusiness.onRepositoryCreatedHook(hookInfo.hook);
      } else {
        return NO_OP(hookInfo);
      }
    case 'ping':
    default:
      return NO_OP(hookInfo);
  }
};

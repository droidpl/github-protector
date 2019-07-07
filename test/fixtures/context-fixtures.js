import repositoryMock from '../mocks/hook-requests/new-repository-mock';
import pingMock from '../mocks/hook-requests/hook-ping-mock';
import missingActionMock from '../mocks/hook-requests/missing-hook-action';
import { sign } from '../../src/utils/github-security-middleware';

export const newRepositoryValidSignature = sign(JSON.stringify(repositoryMock));
export const pingValidSignature = sign(JSON.stringify(pingMock));
export const missingHookActionValidSignature = sign(JSON.stringify(missingActionMock));
export const invalidSignature = 'sha1=thisIsNotValid';
export const newRepositoryContext = {
  headers: {
    'x-hub-signature': newRepositoryValidSignature,
  },
  request: {
    body: repositoryMock,
    rawBody: JSON.stringify(repositoryMock),
  },
};

export const newRepositoryWithoutHeaderContext = {
  headers: {},
  request: {
    body: repositoryMock,
    rawBody: JSON.stringify(repositoryMock),
  },
};

export const newRepositoryWithInvalidHeader = {
  headers: {
    'x-hub-signature': invalidSignature,
  },
  request: {
    body: repositoryMock,
    rawBody: JSON.stringify(repositoryMock),
  },
};

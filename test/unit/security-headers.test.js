import securityHeaderMiddleware from '../../src/utils/github-security-middleware';
import {
  newRepositoryContext,
  newRepositoryWithoutHeaderContext,
  newRepositoryWithInvalidHeader,
} from '../fixtures/context-fixtures';

describe('Github x-hub security header test', () => {
  test('Correct header moves the request forward', async () => {
    let error = null;
    const nextCall = jest.fn();
    try {
      await securityHeaderMiddleware(newRepositoryContext, nextCall);
    } catch (err) {
      error = err;
    }
    expect(error).toBe(null);
    expect(nextCall).toHaveBeenCalled();
  });

  test('Missing header throws a 400', async () => {
    let error = null;
    const nextCall = jest.fn();
    try {
      await securityHeaderMiddleware(newRepositoryWithoutHeaderContext, nextCall);
    } catch (err) {
      error = err;
      expect(err.status).toBe(400);
      expect(err.message).not.toBe(null);
    }
    expect(error).not.toBe(null);
    expect(nextCall).not.toHaveBeenCalled();
  });

  test('Invalid header throws a 403', async () => {
    let error = null;
    const nextCall = jest.fn();
    try {
      await securityHeaderMiddleware(newRepositoryWithInvalidHeader, nextCall);
    } catch (err) {
      error = err;
      expect(err.status).toBe(403);
      expect(err.message).not.toBe(null);
    }
    expect(error).not.toBe(null);
    expect(nextCall).not.toHaveBeenCalled();
  });
});

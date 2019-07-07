import request from 'supertest';
import server from '../../src/server';
import { pingValidSignature, missingHookActionValidSignature } from '../fixtures/context-fixtures';
import pingHookRequest from '../mocks/hook-requests/hook-ping-mock';
import missingActionInHook from '../mocks/hook-requests/missing-hook-action';

describe('Incorrect hook format', () => {
  test('Without a command on x-github-event', async () => {
    const response = await request(server.callback())
      .post('/')
      .set('x-hub-signature', pingValidSignature)
      .send(pingHookRequest)
      .expect(400);
    expect(response.status).toBe(400);
  });
  test('Without an action for repository hook', async () => {
    const response = await request(server.callback())
      .post('/')
      .set('x-hub-signature', missingHookActionValidSignature)
      .set('x-github-event', 'repository')
      .send(missingActionInHook)
      .expect(400);
    expect(response.status).toBe(400);
  });
});

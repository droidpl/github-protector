import request from 'supertest';
import server from '../../src/server';
import { pingValidSignature } from '../fixtures/context-fixtures';
import pingHookRequest from '../mocks/hook-requests/hook-ping-mock';

describe('Ping hook test', () => {
  test('Ping hook returns NO_OP', async () => {
    const response = await request(server.callback())
      .post('/')
      .set('x-hub-signature', pingValidSignature)
      .set('x-github-event', 'ping')
      .send(pingHookRequest);
    expect(response.status).toBeDefined();
    expect(response.body).toBeDefined();
    expect(response.body.ok).toBe(true);
    expect(response.body.processed).toBe(false);
  });
});

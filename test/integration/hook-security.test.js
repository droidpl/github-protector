import request from 'supertest';
import server from '../../src/server';
import newRepositoryRequest from '../mocks/hook-requests/new-repository-mock';

describe('Hooks are protected by security', () => {
  test('Security header is processed and if missing 400', async () => {
    await request(server.callback())
      .post('/')
      .send(newRepositoryRequest)
      .expect(400);
  });
  test('Security header is processed and if wrong 403', async () => {
    await request(server.callback())
      .post('/')
      .set('x-hub-signature', 'thisIsNotCorrect')
      .send(newRepositoryRequest)
      .expect(403);
  });
});

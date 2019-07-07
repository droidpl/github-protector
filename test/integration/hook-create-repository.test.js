import request from 'supertest';
import MockAdapter from 'axios-mock-adapter';

import createRepositoryHookMock from '../mocks/hook-requests/new-repository-mock';
import branchResponse from '../mocks/github-responses/github-response-branch';
import createIssueResponse from '../mocks/github-responses/github-response-create-issue';
import protectionResponse from '../mocks/github-responses/github-response-protection';
import { newRepositoryValidSignature } from '../fixtures/context-fixtures';

import { githubAxios } from '../../src/services/github-api';
import server from '../../src/server';

const BRANCHES_URL = '/repos/shield-org/Sample/branches/master';
const PROTECTION_URL = '/repos/shield-org/Sample/branches/master/protection';
const ISSUES_URL = '/repos/shield-org/Sample/issues';

describe('Create repository hook test', () => {
  let mock = null;
  beforeAll(() => {
    mock = new MockAdapter(githubAxios);
  });
  beforeEach(() => {
    mock.reset();
  });
  test('All works correctly providing information about the steps', async () => {
    mock
      .onGet(BRANCHES_URL)
      .reply(200, branchResponse)
      .onPut(PROTECTION_URL)
      .reply(200, protectionResponse)
      .onPost(ISSUES_URL)
      .reply(200, createIssueResponse);

    const response = await request(server.callback())
      .post('/')
      .set('x-hub-signature', newRepositoryValidSignature)
      .set('x-github-event', 'repository')
      .send(createRepositoryHookMock);

    expect(response.status).toBe(200);
    expect(response.body.protectedInfo).toBeDefined();
    expect(response.body.issueInfo).toBeDefined();
  });
  test('Throws 400 if master does not exist', async () => {
    mock.onGet(BRANCHES_URL).reply(404);

    const response = await request(server.callback())
      .post('/')
      .set('x-hub-signature', newRepositoryValidSignature)
      .set('x-github-event', 'repository')
      .send(createRepositoryHookMock);

    expect(response.status).toBe(400);
    expect(response.body.protectedInfo).not.toBeDefined();
    expect(response.body.issueInfo).not.toBeDefined();
    expect(response.body.message).toBeDefined();
  });
  test('Propagates error if something fails protecting the branch', async () => {
    mock
      .onGet(BRANCHES_URL)
      .reply(200, branchResponse)
      .onPut(PROTECTION_URL)
      .reply(500);

    const response = await request(server.callback())
      .post('/')
      .set('x-hub-signature', newRepositoryValidSignature)
      .set('x-github-event', 'repository')
      .send(createRepositoryHookMock);

    expect(response.status).toBe(500);
    expect(response.body.message).toBeDefined();
  });
  test('Propagates error if something fails creating the issue', async () => {
    mock
      .onGet(BRANCHES_URL)
      .reply(200, branchResponse)
      .onPut(PROTECTION_URL)
      .reply(200, protectionResponse)
      .onPost(ISSUES_URL)
      .reply(500);

    const response = await request(server.callback())
      .post('/')
      .set('x-hub-signature', newRepositoryValidSignature)
      .set('x-github-event', 'repository')
      .send(createRepositoryHookMock);

    expect(response.status).toBe(500);
    expect(response.body.message).toBeDefined();
  });
  test('Issue body is correctly created', async () => {
    mock
      .onGet(BRANCHES_URL)
      .reply(200, branchResponse)
      .onPut(PROTECTION_URL)
      .reply(200, protectionResponse)
      .onPost(ISSUES_URL)
      .reply(200, createIssueResponse);

    const response = await request(server.callback())
      .post('/')
      .set('x-hub-signature', newRepositoryValidSignature)
      .set('x-github-event', 'repository')
      .send(createRepositoryHookMock);

    expect(response.body.issueInfo.body).toContain('@droidpl');
    expect(response.body.issueInfo.body).toContain('the master branch');
    expect(response.body.issueInfo.body).toContain('Cheers');
  });
});

import Koa from 'koa';
import config from './router-config';
import { GITHUB_PERSONAL_TOKEN, GITHUB_WEBHOOK_SECRET } from './utils/env.js';

// Ensure the env vars are set
if (!GITHUB_PERSONAL_TOKEN) {
  throw new Error('The GITHUB_PERSONAL_TOKEN is not set');
}
if (!GITHUB_WEBHOOK_SECRET) {
  throw new Error('The GITHUB_WEBHOOK_SECRET is not set');
}

const app = new Koa();
config(app);

export default app;

import Koa from 'koa';
import config from './router-config';

// Ensure the env vars are set
if (!process.env.GITHUB_PERSONAL_TOKEN) {
  throw new Error('The GITHUB_PERSONAL_TOKEN is not set');
}
if (!process.env.GITHUB_WEBHOOK_SECRET) {
  throw new Error('The GITHUB_WEBHOOK_SECRET is not set');
}

const app = new Koa();
config(app);

export default app;

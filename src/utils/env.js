import * as functions from 'firebase-functions';

export const GITHUB_WEBHOOK_SECRET =
  process.env.GITHUB_WEBHOOK_SECRET ||
  (functions.config().github && functions.config().github.secret) ||
  null;
export const GITHUB_PERSONAL_TOKEN =
  process.env.GITHUB_PERSONAL_TOKEN ||
  (functions.config().github && functions.config().github.token) ||
  null;
export const PORT = process.env.PORT || '3000';
export const LOCAL_ENV = process.env.LOCAL_ENV === 'true';

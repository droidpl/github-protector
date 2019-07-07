import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import responseHandler from './utils/response-handler';
import errorHandler from './utils/error-handler';
import githubSecurityMiddleware from './utils/github-security-middleware';
import { repositoryWebhook } from './controllers/hook-controller';
import firebaseFunctionsCompat from './utils/firebase-functions-compat-middleware';

export default (app) => {
  const router = new Router();

  // Webhook definitions
  router.post('/', githubSecurityMiddleware, repositoryWebhook);

  app.use(errorHandler);
  app.use(responseHandler);
  app.use(firebaseFunctionsCompat);
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());
};

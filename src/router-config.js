import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import Koa2JoiValidator from 'koa2-joi-validate';
import responseHandler from './utils/response-handler';
import errorHandler from './utils/error-handler';
import githubSecurityMiddleware from './utils/github-security-middleware';
import { repositoryWebhook, hookValidation } from './controllers/hook-controller';
import firebaseFunctionsCompat from './utils/firebase-functions-compat-middleware';

export default (app) => {
  const router = new Router();
  const validator = Koa2JoiValidator({
    passError: true,
  });

  // Webhook definitions
  router.post('/', githubSecurityMiddleware, validator.body(hookValidation), repositoryWebhook);

  app.use(errorHandler);
  app.use(firebaseFunctionsCompat);
  app.use(responseHandler);
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());
};

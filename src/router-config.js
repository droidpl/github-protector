import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import Koa2JoiValidator from 'koa2-joi-validate';
import responseHandler from './utils/response-handler';
import githubSecurityMiddleware from './utils/github-security-middleware';
import { repositoryWebhook, hookValidation } from './controllers/hook-controller';

export default (app) => {
  const router = new Router();
  const validator = Koa2JoiValidator({
    passError: true,
  });

  // Webhook definitions
  router.post('/', validator.body(hookValidation), repositoryWebhook);

  app.use(bodyParser());
  app.use(responseHandler);
  app.use(githubSecurityMiddleware);
  app.use(router.routes());
  app.use(router.allowedMethods());
};

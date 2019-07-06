import Joi from 'joi';
import hookMediator from './hook-mediator';
import { respond } from '../utils/api-response';

export const repositoryWebhook = async (ctx) => {
  const hookInfo = {
    event: ctx.request.headers['x-github-event'],
    type: ctx.request.body.action,
    hook: ctx.request.body,
  };
  const result = await hookMediator(hookInfo);
  return respond(result, 200, ctx);
};

export const hookValidation = Joi.object();

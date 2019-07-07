import Joi from 'joi';
import hookMediator from './hook-mediator';
import { respond } from '../utils/api-response';

export const repositoryWebhook = async (ctx) => {
  const body = ctx.request.body;
  const hookInfo = {
    event: ctx.headers['x-github-event'],
    type: body.action,
    hook: body,
  };
  const result = await hookMediator(hookInfo);
  return respond(result, 200, ctx);
};

export const hookValidation = Joi.object();

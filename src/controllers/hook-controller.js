import Joi from 'joi';
import hookMediator from './hook-mediator';
import { respond } from '../utils/api-response';
import { getBody } from '../utils/utils';

export const repositoryWebhook = async (ctx) => {
  const body = getBody(ctx);
  const hookInfo = {
    event: ctx.headers['x-github-event'],
    type: body.action,
    hook: body,
  };
  const result = await hookMediator(hookInfo);
  return respond(result, 200, ctx);
};

export const hookValidation = Joi.object();

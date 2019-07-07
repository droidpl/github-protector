import hookMediator from './hook-mediator';
import { respond, throwError } from '../utils/api-response';

export const repositoryWebhook = async (ctx) => {
  const body = ctx.request.body;
  const eventType = ctx.headers['x-github-event'];
  if (!eventType) {
    throwError('The x-github-event is missing', 400);
  }
  const hookInfo = {
    event: ctx.headers['x-github-event'],
    type: body.action,
    hook: body,
  };
  const result = await hookMediator(hookInfo);
  return respond(result, 200, ctx);
};

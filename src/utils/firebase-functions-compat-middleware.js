import { LOCAL_ENV } from './env';

export default async (ctx, next) => {
  if (!LOCAL_ENV) {
    ctx.request.body = ctx.req.body;
    ctx.request.rawBody = ctx.req.rawBody;
  }
  await next();
};

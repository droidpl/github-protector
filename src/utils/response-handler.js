import ApiResponse from './api-response';

export default async (ctx, next) => {
  try {
    await next();
    if (ctx.body && ctx.body instanceof ApiResponse) {
      ctx.status = ctx.body.status;
      ctx.body = ctx.body.body;
    }
  } catch (e) {
    if (e.isJoi) {
      ctx.status = 400;
      ctx.body = e;
    }
    throw e;
  }
};

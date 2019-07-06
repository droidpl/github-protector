export default async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = (error.response && error.response.status) || error.status || 500;
    ctx.body = (error.response && error.response.data) || {
      message: error.message,
    };
    ctx.app.emit('error', error, ctx);
  }
};

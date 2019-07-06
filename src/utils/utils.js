import { LOCAL_ENV } from './env';
export const getBody = (ctx) => {
  return !LOCAL_ENV ? ctx.req.body : ctx.request.body;
};

export const getRawBody = (ctx) => {
  return !LOCAL_ENV ? ctx.req.rawBody : ctx.request.rawBody;
};

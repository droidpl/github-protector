class ApiResponse {
  constructor(body, status) {
    this.body = body;
    this.status = status;
  }
}

export const respond = (body, status, ctx) => {
  ctx.body = new ApiResponse(body, status);
  return ctx.body;
};

export const throwError = (message, status, ctx) => {
  ctx.throw(status, message);
};

export default ApiResponse;

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

export const throwError = (message, status) => {
  let error = new Error(message);
  error.status = status;
  error.message = message;
  throw error;
};

export default ApiResponse;

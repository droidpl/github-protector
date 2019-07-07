import responseHandler from '../../src/utils/response-handler';
import { respond, throwError } from '../../src/utils/api-response';

describe('Koa response handler', () => {
  test('Body and status are passed through', async () => {
    const context = {
      body: undefined,
    };
    const responseFunction = () => {
      return respond({ message: 'sample body' }, 200, context);
    };
    await responseHandler(context, responseFunction);
    expect(context.body).not.toBe(null);
    expect(context.body.message).toBeDefined();
    expect(context.body.message).toBe('sample body');
    expect(context.status).toBe(200);
  });

  test('Errors are dispatched from the handler', async () => {
    let error = null;
    const context = {
      body: undefined,
    };
    const responseFunction = () => {
      return throwError('sample error', 500);
    };
    try {
      await responseHandler(context, responseFunction);
    } catch (e) {
      error = e;
    }
    expect(error).not.toBe(null);
    expect(error.status).toBe(500);
    expect(error.message).toBe('sample error');
  });
});

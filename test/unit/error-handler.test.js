import errorHandler from '../../src/utils/error-handler';
import { respond, throwError } from '../../src/utils/api-response';
import ApiResponse from '../../src/utils/api-response';

describe('Koa error handler', () => {
  test('Body without error is respected', async () => {
    const context = {
      body: undefined,
    };
    const responseFunction = () => {
      return respond({ message: 'sample body' }, 200, context);
    };
    await errorHandler(context, responseFunction);
    expect(context.body).toBeDefined();
    expect(context.body instanceof ApiResponse).toBe(true);
    expect(context.body.status).toBe(200);
  });

  test('Thrown errors are caught and applied', async () => {
    const context = {
      body: undefined,
      app: {
        emit: jest.fn(),
      },
    };
    const responseFunction = () => {
      return throwError('sample error', 500);
    };
    await errorHandler(context, responseFunction);
    expect(context.body.message).toBe('sample error');
    expect(context.status).toBe(500);
    expect(context.app.emit).toHaveBeenCalled();
  });
});

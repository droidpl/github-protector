import { delayedExecution } from '../../src/utils/utils';
describe('Utils', () => {
  test('Timer gets executed', async () => {
    const jestFunc = jest.fn();
    await delayedExecution(200, jestFunc);
    jest.runAllTimers();
    expect(jestFunc).toHaveBeenCalled();
  });
});

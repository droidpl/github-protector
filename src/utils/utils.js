export const delayedExecution = async (timeMillis, func) => {
  await new Promise((resolve) => setTimeout(resolve, timeMillis));
  return await func();
};

export const errorResponseBody = (message: string): Object => {
  return {
    success: false,
    message: message,
    data: null,
  };
};

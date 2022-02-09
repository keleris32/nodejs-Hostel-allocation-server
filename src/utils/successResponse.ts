export const successResponseBody = (
  message: string,
  responseData: Object
): Object => {
  return {
    success: true,
    message: message,
    data: responseData,
  };
};

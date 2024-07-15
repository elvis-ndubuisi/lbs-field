/* eslint-disable @typescript-eslint/no-explicit-any */
export function throwServerError(error: any) {
  if (error?.response) {
    throw error?.response?.data;
  } else if (error?.request) {
    console.debug(error?.request);
  } else {
    console.error(error);
  }
}

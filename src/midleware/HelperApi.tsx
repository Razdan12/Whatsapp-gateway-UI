import axios, { AxiosError } from 'axios';

interface AxiosErrorResponse {
  message?: string;
  errors?: {
    error?: {
      message?:
        | string
        | {
            meta?: { target?: string };
            validationMessage?: string;
          };
    };
  };
}

function extractCustomErrorMessage(
  errorData: AxiosErrorResponse
): string | undefined {
  const errorMessage = errorData.errors?.error?.message;

  if (
    typeof errorMessage === 'object' &&
    errorMessage.meta?.target === 'Users_username_key'
  ) {
    return 'Username is already existed';
  }

  if (typeof errorMessage === 'object' && errorMessage.validationMessage) {
    return errorMessage.validationMessage;
  }

  return typeof errorMessage === 'string' ? errorMessage : undefined;
}

function getErrorMessage(
  error: unknown,
  defaultErrorMessage = 'An unexpected error occurred'
): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<AxiosErrorResponse>;
    const errorData = axiosError.response?.data;

    return (
      errorData?.message ||
      extractCustomErrorMessage(errorData || {}) ||
      defaultErrorMessage
    );
  }

  return (error as Error).message || defaultErrorMessage;
}

export default getErrorMessage;

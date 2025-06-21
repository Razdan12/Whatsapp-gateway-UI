import apiClient from './index';

export interface AuthData {
  user: any;
  token: {
    access_token: string;
    refresh_token: string;
  };
}

export interface AuthResponse {
  status: boolean;
  message: string;
  data: AuthData;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends AuthCredentials {
  confirm_password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  password: string;
  confirm_password: string;
  token: string;
}

export interface ForgotPasswordResponse {
  status: boolean;
  message: string;
}

export const loginAPI = async (
  credentials: AuthCredentials
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    '/api/v1/auth/login',
    credentials
  );
  return response.data;
};

export const signupAPI = async (
  credentials: SignupCredentials
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    '/api/v1/auth/register',
    credentials
  );
  return response.data;
};

export const refreshTokenAPI = async (
  refresh_token: string
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/api/v1/auth/refresh', {
    refresh_token,
  });
  return response.data;
};

export const forgotPasswordAPI = async (
  data: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> => {
  const response = await apiClient.post<ForgotPasswordResponse>(
    '/api/v1/auth/forgot-pass',
    data
  );
  return response.data;
};

export const resetPasswordAPI = async (
  data: ResetPasswordRequest
): Promise<ForgotPasswordResponse> => {
  const response = await apiClient.put<ForgotPasswordResponse>(
    '/api/v1/auth/reset-pass',
    data
  );
  return response.data;
};

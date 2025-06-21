
import { listedUser } from '@/constant/listed';
import useAuthStore from '@/store/auth.store';
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_API_URL,
  timeout: 10000,

});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await useAuthStore.getState().refreshToken();
        const newToken = useAuthStore.getState().token;
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest); 
        }
      } catch (refreshError) {
        console.error('Refresh token failed, logging out...');
        useAuthStore.getState().logout();
        window.location.href = listedUser.login; 
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
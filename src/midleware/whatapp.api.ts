import axios, { AxiosPromise } from 'axios';

import useAuthStore from '../store/auth.store';
import { getQR } from '../utils/whatsapp';

const server = axios.create({ baseURL: import.meta.env.VITE_REACT_API_URL });

export const authWA = {
 
  generateToken: (): AxiosPromise<any> =>
    server({
      method: 'GET',
      url: 'api/v1/auth/generate-token',
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
      },
    }),
  getQR: (): AxiosPromise<any> =>
    server({
      method: 'GET',
      url: `api/v1/wa/qr`,
      headers: {
        'x-api-key': useAuthStore.getState().tokenApi,
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
      },
    }),
  sendMessage: (number: string, message: string): AxiosPromise<any> =>
    server({
      method: 'GET',
      url: `api/v1/wa/send-message`,
      headers: {
        'x-api-key': useAuthStore.getState().tokenApi,
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
      },
      data: {
        number,
        message
      }
    }),
  checkStatus: (): AxiosPromise<any> =>
    server({
      method: 'GET',
      url: `api/v1/wa/status`,
      headers: {
        'x-api-key': useAuthStore.getState().tokenApi,
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
      },
    }),
};

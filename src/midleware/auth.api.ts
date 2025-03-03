import axios, {
  AxiosPromise,

} from 'axios';

import { Login, loginResponse, Register } from '../utils/auth';

const server = axios.create({ baseURL: import.meta.env.VITE_REACT_API_URL });

export const authApi = {
  register: (data: Register): AxiosPromise<Register> =>
    server({
      method: 'POST',
      url: 'api/v1/auth/register',
      data,
    }),
  login: (data: Login): AxiosPromise<any> =>
    server({
      method: 'POST',
      url: 'api/v1/auth/login',
      data,
    }),
};

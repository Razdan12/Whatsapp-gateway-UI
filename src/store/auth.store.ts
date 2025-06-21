import { create } from 'zustand';

import Swal from 'sweetalert2';
import { AuthCredentials, AuthResponse, loginAPI, refreshTokenAPI, signupAPI, SignupCredentials } from '@/midleware/auth.api';
import getErrorMessage from '@/midleware/HelperApi';

interface AuthStoreState {
  user: any | null;
  token: string | null;
  isHydrated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: any) => void;
  login: (creds: AuthCredentials) => Promise<AuthResponse | void>;
  signup: (creds: SignupCredentials) => Promise<AuthResponse | void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const useAuthStore = create<AuthStoreState>((set, get) => ({
  user: null,
  token: sessionStorage.getItem("token"),
  isHydrated: false,
  isLoading: false,
  error: null,

  setUser: (user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },

  login: async (credentials) => {
    set({ isLoading: true , error: null,});
    try {
      const res: AuthResponse = await loginAPI(credentials);
      const { user, token } = res.data;
      sessionStorage.setItem('token', token.access_token);
      localStorage.setItem('refresh', token.refresh_token);
      sessionStorage.setItem('user', JSON.stringify(user));
      set({ user, token: token.access_token, isLoading: false });
      return res;
    } catch (err) {
       Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: getErrorMessage(err, 'failed. Please try again.'),
      });
      set({ error: getErrorMessage(err), isLoading: false });
    }
  },

  signup: async (credentials) => {
    set({ isLoading: true });
    try {
      const res: AuthResponse = await signupAPI(credentials);
      const { user, token } = res.data;
      sessionStorage.setItem('token', token.access_token);
      localStorage.setItem('refresh', token.refresh_token);
      sessionStorage.setItem('user', JSON.stringify(user));
      set({ user, token: token.access_token, isLoading: false });
      return res;
    } catch (err) {
       Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: getErrorMessage(err, 'failed. Please try again.'),
      });
      set({ error: getErrorMessage(err), isLoading: false });
    }
  },

  logout: () => {
    localStorage.clear();
    set({ user: null, token: null });
  },

  refreshToken: async () => {
    const refresh = localStorage.getItem('refresh');
    console.log(refresh);
    
    if (!refresh) return get().logout();
    try {
      const res: AuthResponse = await refreshTokenAPI(refresh);
      const { user, token } = res.data;
      sessionStorage.setItem('token', token.access_token);
      localStorage.setItem('refresh', token.refresh_token);
      sessionStorage.setItem('user', JSON.stringify(user));
      set({ user, token: token.access_token });
    } catch {
      get().logout();
    }
  },
}));

// ✅ hydrate manually in main.ts
export const hydrateAuth = () => {
  const token = sessionStorage.getItem('token');
  const user = sessionStorage.getItem('user');
  useAuthStore.setState({
    token: token || null,
    user: user ? JSON.parse(user) : null,
    isHydrated: true,
  });
};

export default useAuthStore;

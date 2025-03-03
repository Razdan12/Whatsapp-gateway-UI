import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  tokenApi: string | null;
  sessionId: string | null;
  id: string| null
  isAuthenticated: boolean;
  setAuth: (data: { accessToken: string}) => void;
  setApiToken: (data: { tokenApi: string}) => void;
  clearAuth: () => void;
}

const initializeAuthState = (): AuthState => {
  const accessToken = localStorage.getItem("access_token");
  const tokenApi = localStorage.getItem("tokenApi");
  const sessionId = localStorage.getItem("sessionId");
  const id = localStorage.getItem('id')
  const isAuthenticated = Boolean(accessToken && tokenApi);

  return {
    accessToken,
    tokenApi,
    sessionId,
    isAuthenticated,
    id,
    setAuth: () => {}, 
    setApiToken: () => {}, 
    clearAuth: () => {}, 
  };
};

const useAuthStore = create<AuthState>((set) => ({
  ...initializeAuthState(),

  setAuth: ({ accessToken }) => {
    set({
      accessToken,
      isAuthenticated: true,
    });
    localStorage.setItem("access_token", accessToken);
  },
  setApiToken: ({ tokenApi }) => {
    set({
      tokenApi,
    });
    localStorage.setItem("tokenApi", tokenApi);
  },

  clearAuth: () => {
    set({
      accessToken: null, 
    });
    localStorage.removeItem("access_token");
  },
}));

export default useAuthStore;

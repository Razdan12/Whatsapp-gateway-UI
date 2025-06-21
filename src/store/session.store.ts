import { create } from 'zustand';

import Swal from 'sweetalert2';
import getErrorMessage from '@/midleware/HelperApi';
import {
  deleteSessions,
  GetAllSessionResponse,
  SessionData,
  SessionItem,
  updateSessions,
} from '@/midleware/session.api';
import { createSession, getAll } from '@/midleware/session.api';

interface State {
  sessionId: any | null;
  sessions: SessionData | null;
  session: any | null;
  isLoading: boolean;
  error: string | null;
  setIdSession: (id: string) => void;
  createSession: (payload: SessionItem) => Promise<SessionItem | void>;
  getAllSession: (payload: string) => void;
  deleteSessions: (id: string) => void;
  updateSessions: (id: string, payload: any) => void;
}

const SessionStore = create<State>((set, get) => ({
  sessionId: null,
  session: null,
  sessions: null,
  isLoading: false,
  error: null,

  setIdSession: (id: string) => {
    set({ sessionId: id });
  },

  createSession: async (payload: SessionItem) => {
    set({ isLoading: true, error: null });
    try {
      const res = await createSession(payload);
      set({ session: res.data, isLoading: false, sessionId: res.data.id });
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

  deleteSessions: async (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteSessions(id);
          Swal.fire('Deleted!', 'Your session has been deleted.', 'success');
          get().getAllSession('');
        }
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: getErrorMessage(error, 'failed. Please try again.'),
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancel',
      });
    }
  },

  getAllSession: async (payload: string) => {
    set({ isLoading: true });
    try {
      const res: GetAllSessionResponse = await getAll(payload);
      set({ sessions: res.data, isLoading: false });
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

  updateSessions: async (id: string, payload: any) => {
    set({ isLoading: true });
    try {
      const res = await updateSessions(id, payload);
      get().getAllSession('');
      set({ isLoading: false });
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
}));

export default SessionStore;

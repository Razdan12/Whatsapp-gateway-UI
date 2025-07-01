import { create } from 'zustand';

import Swal from 'sweetalert2';
import getErrorMessage from '@/midleware/HelperApi';
import { createWebhook, Data,  deleteWebhook,  GetAllResponse,  getAllWebhook,  Item, updateWebhook } from '@/midleware/webhook.api';

interface State {
  webhookId: any | null;
  webhooks: Data | null;
  webhook: any | null;
  isLoading: boolean;
  error: string | null;
  setId: (id: string) => void;
  createWebhook: (payload: Item) => Promise<Item | void>;
  getAllWebhook: (payload: string) => void;
  deleteWebhook: (id: string) => void;
  updateWebhook: (id: string, payload: any) => void;
}

const SessionStore = create<State>((set, get) => ({
  webhookId: null,
  webhook: null,
  webhooks: null,
  isLoading: false,
  error: null,

  setId: (id: string) => {
    set({ webhookId: id });
  },

  createWebhook: async (payload: Item) => {
    set({ isLoading: true, error: null });
    try {
      const res = await createWebhook(payload);
      set({ webhook: res.data, isLoading: false, webhookId: res.data.id });
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

  deleteWebhook: async (id) => {
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
          await deleteWebhook(id);
          Swal.fire('Deleted!', 'Your session has been deleted.', 'success');
          get().getAllWebhook('');
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

  getAllWebhook: async (payload: string) => {
    set({ isLoading: true });
    try {
      const res: GetAllResponse = await getAllWebhook(payload);
      set({ webhooks: res.data, isLoading: false });
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

  updateWebhook: async (id: string, payload: any) => {
    set({ isLoading: true });
    try {
      const res = await updateWebhook(id, payload);
      get().getAllWebhook('');
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

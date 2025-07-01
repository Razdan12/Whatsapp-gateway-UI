import apiClient from './index';

export interface Item {
  id?: string;
  url: string;
  event: string;
  isGroup?: Boolean;
  userId?: string;
  SessionId: string;
  method: string;
  payload?: string;
  isActive?: Boolean;
}

export interface Data {
  total_items: number;
  page: number;
  limit: number;
  total_pages: number;
  items: Item[];
}

export interface GetAllResponse {
  status: boolean;
  message: string;
  data: Data;
}

export const createWebhook = async (payload: Item): Promise<any> => {
  const response = await apiClient.post<Item>(
    '/api/v1/webhook/create',
    payload
  );
  return response.data;
};

export const getAllWebhook = async (
  payload: string
): Promise<GetAllResponse> => {
  const response = await apiClient.get<GetAllResponse>(
    `/api/v1/webhook/show-all?${payload}`
  );
  return response.data;
};

export const deleteWebhook = async (id: string): Promise<any> => {
  const response = await apiClient.delete<any>(`/api/v1/webhook/delete/${id}`);
  return response.data;
};

export const updateWebhook = async (
  id: string,
  payload: any
): Promise<any> => {
  const response = await apiClient.delete<any>(
    `/api/v1/session/update/${id}`,
    payload
  );
  return response.data;
};

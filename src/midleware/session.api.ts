import apiClient from './index';

export interface SessionItem {
  id?: string;
  userId?: string;
  name: string;
  createdAt?: string; // ISO 8601 date string
  isActive?: boolean;
  status?: boolean
}

export interface SessionData {
  total_items: number;
  page: number;
  limit: number;
  total_pages: number;
  items: SessionItem[];
}

export interface GetAllSessionResponse {
  status: boolean;
  message: string;
  data: SessionData;
}


export const createSession = async (payload: SessionItem): Promise<any> => {
  const response = await apiClient.post<SessionItem>(
    '/api/v1/session/create',
    payload
  );
  return response.data;
};

export const getAll = async (payload: string): Promise<GetAllSessionResponse> => {
  const response = await apiClient.get<GetAllSessionResponse>(
    `/api/v1/session/show-by-user?${payload}`
  );
  return response.data;
};

export const deleteSessions = async (id: string): Promise<any> => {
  const response = await apiClient.delete<any>(
    `/api/v1/session/delete/${id}`
  );
  return response.data;
};

export const updateSessions = async (id: string, payload: any): Promise<any> => {
  const response = await apiClient.delete<any>(
    `/api/v1/session/update/${id}`,
    payload
  );
  return response.data;
};


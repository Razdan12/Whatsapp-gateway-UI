import apiClient from './index';



export const startSession = async (sessionId: string): Promise<any> => {
     
  const response = await apiClient.get<any>(
    `/api/v1/wa/start?sessionId=${sessionId}`,
   
  );
  return response.data;
};

export const getQRWa = async (sessionId: string): Promise<any> => {
  const response = await apiClient.get<any>(
    `api/v1/wa/qr?id=${sessionId}`,
   
  );
  return response.data;
};

export const cekStatus = async (sessionId: string): Promise<any> => {
  const response = await apiClient.get<any>(
    `api/v1/session/check-status/${sessionId}`,
   
  );
  return response.data;
};

// export const getAll = async (payload: string): Promise<SessionData> => {
//   const response = await apiClient.get<SessionData>(
//     `/api/v1/session/show-by-user?${payload}`
//   );
//   return response.data;
// };

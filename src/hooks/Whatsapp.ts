// src/hooks/useWhatsAppSession.ts
import { useEffect, useState, useCallback } from 'react';
import { socket, connectSocket, joinRoom, leaveRoom } from '@/utils/Socket';
import { startSession , cekStatus} from '@/midleware/whatsapp.api';

interface UseWhatsAppSession {
  qr: string;
  connected: boolean;
}

interface SocketPayload {
  sessionId: string;
}

interface QrPayload extends SocketPayload {
  qr: string;
}

interface SessionStatusPayload extends SocketPayload {
  connected: boolean;
  already?: boolean;
}

export function useWhatsAppSession(sessionId: string): UseWhatsAppSession {
  const [qr, setQr]           = useState<string>('');
  const [connected, setConn]  = useState<boolean>(false);

  const handleQr = useCallback(
    ({ qr: code, sessionId: sid }: QrPayload) => {
      if (sid !== sessionId) return;
      setQr(code);
    },
    [sessionId]
  );

  // const handleConnected = useCallback(
  //   ({ sessionId: sid }: SocketPayload) => {
  //     if (sid !== sessionId) return;
  //     setConn(true);
  //     socket.off('qr', handleQr); // stop QR once connected
  //   },
  //   [sessionId, handleQr]
  // );

  // const handleDisconnected = useCallback(
  //   ({ sessionId: sid }: SocketPayload) => {
  //     if (sid !== sessionId) return;
  //     setConn(false);
  //     setQr('');
  //   },
  //   [sessionId]
  // );

  // const handleSessionStatus = useCallback(
  //   ({ sessionId: sid, connected: isConn, already }: SessionStatusPayload) => {
  //     if (sid !== sessionId) return;
   
  //     setConn(isConn);
  //     if (already) {
  //       // jika sudah terkoneksi sebelumnya, QR tidak perlu lagi
  //       setQr('');
  //     }
  //   },
  //   [sessionId]
  // );

  const handleStatus = async () => {
    const res = await cekStatus(sessionId)
    setConn(res.data.status)
    
  }

  useEffect(() => {
    if (!sessionId) return;
    connectSocket();
    joinRoom(sessionId);
    if (!connected) {
      startSession(sessionId).catch(console.error);
    }
    return () => {
      leaveRoom(sessionId);
    };
  }, [sessionId, connected]);

  useEffect(() => {
   handleStatus()
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) return;
   
    socket.on('qr',             handleQr);
    // socket.on('connected',      handleConnected);
    // socket.on('disconnected',   handleDisconnected);
    // socket.on('session_status', handleSessionStatus);

  }, [
    sessionId,
    handleQr,
    
    // handleConnected,
    // handleDisconnected,
    // handleSessionStatus
  ]);

  console.log(connected);
  

  return { qr, connected };
}

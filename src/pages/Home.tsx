import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import QRCode from 'qrcode';
import { useSearchParams } from 'react-router-dom';

import AuthScreen from '../components/auth-screen';
import { startSession } from '@/midleware/whatsapp.api';

// Ganti dengan URL socket.io server Anda
const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_REACT_API_URL;
const socket = io(SOCKET_URL);

const Home: React.FC = () => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get('sessionId') ?? '';

  // 1) Start session di backend & join room
  useEffect(() => {
    if (!sessionId) return;
    if (!isConnected) {
     
      startSession(sessionId).catch((err) =>
        console.error('startSession error:', err)
      );
      socket.emit('join-room', sessionId);
    }
    
  }, [sessionId]);

  // 2) Pasang listener socket
  useEffect(() => {
    if (!sessionId) return;

    const handleQr = async ({
      qr,
      sessionId: sid,
    }: {
      qr: string;
      sessionId: string;
    }) => {
      console.log('ini jalan');
      
      if (sid !== sessionId) return;
      try {
        // const dataUrl = await QRCode.toDataURL(qr);
        setQrDataUrl(qr);
      } catch (err) {
        console.error('QR → DataURL error:', err);
      }
    };

    const handleConnected = ({ sessionId: sid }: { sessionId: string }) => {
      if (sid !== sessionId) return;
      setIsConnected(true);
      socket.off('qr', handleQr);
    };

    const handleDisconnected = ({ sessionId: sid }: { sessionId: string }) => {
      if (sid !== sessionId) return;
      setIsConnected(false);
      setQrDataUrl(''); // clear QR
    };

    const handleMessage = ({
      sessionId: sid,
      m,
    }: {
      sessionId: string;
      m: any;
    }) => {
      if (sid !== sessionId) return;
      console.log('New message:', m);
    };

    socket.on('qr', handleQr);
    socket.on('connected', handleConnected);
    socket.on('disconnected', handleDisconnected);
    socket.on('message', handleMessage);

    // return () => {
    //   socket.off('qr',           handleQr);
    //   socket.off('connected',    handleConnected);
    //   socket.off('disconnected', handleDisconnected);
    //   socket.off('message',      handleMessage);
    //   socket.emit('leave-room', sessionId);
    // };
  }, [sessionId]);

  return (
    <div className="h-screen flex items-center justify-center bg-[#111b21]">
      {isConnected && <div>Conect</div>}
      <AuthScreen qrCodeSrc={qrDataUrl} />
    </div>
  );
};

export default Home;

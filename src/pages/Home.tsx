import React, { useState, useEffect } from 'react';
import { authWA } from '../midleware/whatapp.api';
import useAuthStore from '../store/auth.store';
import { io } from 'socket.io-client';
import QRCode from 'qrcode';
import Sidebar from '../components/sidebar';
import ChatArea from '../components/chat-area';
import AuthScreen from '../components/auth-screen';

// Inisialisasi socket, sesuaikan URL backend jika diperlukan
const socket = io(import.meta.env.VITE_REACT_API_URL);

const Home: React.FC = () => {
  const [qrDataUrl, setQrDataUrl] = useState<string>(''); // Data URL gambar QR code
  const [sessionId, setSessionId] = useState<string>(''); // Session ID dari backend
  const [isConnected, setIsConnected] = useState<boolean>(false); // Status koneksi WhatsApp
  const setApiToken = useAuthStore((state) => state.setApiToken);
  const { tokenApi } = useAuthStore();

  useEffect(() => {
    // Mendengarkan event "session" dari socket untuk mendapatkan sessionId
    socket.on('session', (data) => {
      if (data && data.sessionId) {
        setSessionId(data.sessionId);
      }
    });

    socket.on('qr', (data) => {
      console.log('QR Code received:', data);
      getQR();
    });

    // Mendengarkan event ketika WhatsApp berhasil terhubung
    socket.on('whatsapp_connected', (data) => {
      console.log('WhatsApp connected:', data);
      setIsConnected(true);
    });

    // Mendengarkan event ketika WhatsApp terputus
    socket.on('whatsapp_disconnected', (data) => {
      console.log('WhatsApp disconnected:', data);
      setIsConnected(false);
    });
    socket.on('chat', (data) => {
      console.log('pesan baru', data);
    //   setIsConnected(false);
    });

    return () => {
      socket.off('session');
      socket.off('whatsapp_connected');
      socket.off('whatsapp_disconnected');
    };
  }, []);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
   
    try {
      const {data} = await authWA.checkStatus()   
      data.connected ? setIsConnected(true) : generateToken()
     
    } catch (error) {
      console.error('Error generating token:', error);
    }
  };

  const generateToken = async () => {
    try {
      const { data } = await authWA.generateToken();
      setApiToken({ tokenApi: data.data.apiToken });
      getQR();
    } catch (error) {
      console.error('Error generating token:', error);
    }
  };

  const getQR = async () => {
    try {
      const { data } = await authWA.getQR();
      console.log(data.data);
      
      const dataUrl = await QRCode.toDataURL(data.data, {
        errorCorrectionLevel: 'H',
      });
  
      data.qr === 'connect'
        ? setIsConnected(true)
        : dataUrl === 'disconect'
        ? setIsConnected(false)
        : setQrDataUrl(dataUrl);
    } catch (error) {
      console.error('Error fetching QR code:', error);
    }
  };

  return (
    <>
      {!isConnected && (
        <div className="h-screen flex items-center justify-center bg-[#111b21]">
          <AuthScreen qrCodeSrc={qrDataUrl} />
        </div>
      )}
      {isConnected && (
       <div className='w-full min-h-screen flex justify-center items-center flex-col'>
        Whatsapp Telah Terhubung
        <div className='shadow-md rounded-md  text-black p-5 overflow-auto'>
        Your Token Api: 
          <p>
            {tokenApi}
          </p>
        </div>
       
       </div>
      )}
    </>
  );
};

export default Home;

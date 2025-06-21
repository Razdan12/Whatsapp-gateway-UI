// src/components/QRComponent.tsx
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useWhatsAppSession } from '@/hooks/Whatsapp';

interface QRComponentProps {
  sessionId: string;
}

const QRComponent: React.FC<QRComponentProps> = ({ sessionId }) => {
  const { qr, connected } = useWhatsAppSession(sessionId);

  if (!sessionId) {
    return <p className="text-center text-red-500">Session ID missing</p>;
  }

  if (connected) {
    return <p className="text-center text-green-500">WhatsApp Connected ✅</p>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3">
      {qr && (
        <div>
          <div className="bg-white p-3 rounded-md">
            <QRCodeSVG value={qr} className="w-80 h-80" />
          </div>
          <ol className="list-decimal list-inside space-y-1 max-w-md text-center text-white">
            <li>Open WhatsApp on your phone</li>
            <li>Menu / Settings &gt; Linked Devices</li>
            <li>Tap “Link a Device”</li>
            <li>Scan this QR code</li>
          </ol>
        </div>
      )}
      {!qr && <div className="animate-pulse">Loading QR Code..</div>}
    </div>
  );
};

export default QRComponent;

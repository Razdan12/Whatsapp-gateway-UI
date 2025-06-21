import React from 'react'
import {QRCodeSVG} from 'qrcode.react';

interface QRCodeProps {
  src: string
  width?: number
  height?: number
}

export const QRCode: React.FC<QRCodeProps> = ({ src}) => {
  return (
    <div className='bg-white p-3'>

      <QRCodeSVG value={src} className='w-80 h-80'/>
    </div>

  )
}

export const InstructionsList: React.FC = () => {
  return (
    <ol className="list-decimal list-inside space-y-2 max-w-md text-center">
      <li>Open WhatsApp on your phone</li>
      <li>Tap Menu or Settings and select Linked Devices</li>
      <li>Tap on Link a Device</li>
      <li>Point your phone to this screen to capture the QR code</li>
    </ol>
  )
}

interface AuthScreenProps {
  qrCodeSrc: string
}

const AuthScreen: React.FC<AuthScreenProps> = ({ qrCodeSrc }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#111b21] text-white">
      <QRCode src={qrCodeSrc} />
      QR {qrCodeSrc}
      <h1 className="text-2xl font-bold mb-4">Use WhatsApp on your computer</h1>
      <InstructionsList />
    </div>
  )
}

export default AuthScreen

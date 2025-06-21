// src/lib/socket.ts
import { io, Socket } from 'socket.io-client';

const URL = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_REACT_API_URL;
const socket: Socket = io(URL, { autoConnect: false });

export function connectSocket() {
  if (!socket.connected) socket.connect();
}

export function disconnectSocket() {
  if (socket.connected) socket.disconnect();
}

export function joinRoom(sessionId: string) {
  socket.emit('join-room', sessionId);
}

export function leaveRoom(sessionId: string) {
  socket.emit('leave-room', sessionId);
}

export { socket };

import React from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000', { transports: ['websocket'] });
const SocketContext = React.createContext();

export { socket, SocketContext };

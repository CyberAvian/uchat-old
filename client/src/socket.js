import React from 'react';
import io from 'socket.io-client';

const socket = io("/", { autoConnect: false });
const SocketContext = React.createContext();

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export { socket, SocketContext };

import React from 'react';
import io from 'socket.io-client';

const URL = "http://localhost:9000";
const socket = io(URL, { autoConnect: false });
const SocketContext = React.createContext();

// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

export { socket, SocketContext };

import React from 'react';
import io from 'socket.io-client';

var port = process.env.REACT_APP_PORT || 9000;
var serverAddress = 'http://localhost:' +  port.toString();
console.log(`Port: ${port} Address: ${serverAddress}`);

const socket = io(serverAddress, { transports: ['websocket'] });
const SocketContext = React.createContext();

export { socket, SocketContext };

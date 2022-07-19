import React from 'react';
import io from 'socket.io-client';

// var port = process.env.REACT_APP_PORT || 9000;
// var serverAddress = 'http://localhost:' +  port.toString();

const socket = io("/");
const SocketContext = React.createContext();

export { socket, SocketContext };

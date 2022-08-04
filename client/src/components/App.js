import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { SocketContext } from '../socket';
import Login from './Login';
import Chat from './chat';
import './App.css';

const App = () => {
  const socket = useContext(SocketContext);
  console.log(socket);

  const [username, setUsername] = useState(null);
  const [socketid, setSocketid] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = (event) => {
    socket.disconnect();
    setUsername(null);
    setSocketid(null);
    setError(null);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let username = event.target.username.value;
    if (username) {
      socket.emit('set data', 'username', username);
    }
  }

  useEffect(() => {
    socket.on('set id', (socketid) => {
      setSocketid(socketid);
    });

    socket.on('set username', (username) => {
      console.log(username);
      setUsername(username);
    });

    socket.on('set error', (error) => {
      setError(error);
    });

    return () => {
      socket.off('set id');
      socket.off('set username');
      socket.off('set error');
      socket.disconnect();
    }
  }, []);

  return (
    <div>
    <Routes>
      <Route index path="/" element={<Login username={username} error={error} submitHandler={handleSubmit} />} />
      <Route path="/chat" element={<Chat  username={username} clickHandler={handleClick} />} />
    </Routes>
    </div>
  );
}

export default App;

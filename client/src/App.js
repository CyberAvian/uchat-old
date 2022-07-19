import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SocketContext } from './socket';
import Login from './Login';
import Chat from './Chat';
import './App.css';

const App = () => {
  const socket = useContext(SocketContext);

  const [username, setUsername] = useState(null);
  const [socketid, setSocketid] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = (event) => {
    socket.connect();
    setUsername(null);
    setSocketid(null);
    setError(null);
  }

  useEffect(() => {
    document.documentElement.setAttribute('theme', 'vodka');
    // document.documentElement.setAttribute('theme', 'mauve');
    // document.documentElement.setAttribute('theme', 'baby-blue-eyes');
    // document.documentElement.setAttribute('theme', 'deep-peach');
    // document.documentElement.setAttribute('theme', 'tea-green');
    // document.documentElement.setAttribute('theme', 'melon');
    // document.documentElement.setAttribute('theme', 'nyanza');
    // document.documentElement.setAttribute('theme', 'light-hot-pink');
    // document.documentElement.setAttribute('theme', 'topaz');
    // document.documentElement.setAttribute('theme', 'pale-green');

    socket.on('set id', (socketid) => {
      setSocketid(socketid);
    });

    socket.on('set username', (username) => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    let username = event.target.username.value;
    if (username) {
      console.log(username);
      socket.emit('set data', 'username', username);
    }
  }

  return (
    <Routes>
      <Route index path="/" element={<Login username={username} error={error} submitHandler={handleSubmit} />} />
      <Route path="/chat" element={<Chat  username={username} clickHandler={handleClick} />} />
    </Routes>
  );
}

export default App;

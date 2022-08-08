import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { SocketContext } from "../../socket";
import Login from '../login/Login';
import Chat from '../chat/Chat';
import './App.css';

const App = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [error, setError] = useState('');

  console.log(socket);

  const handleSubmit = (event) => {
    event.preventDefault();
    var username = event.target.username.value;
    socket.auth = { username };
    socket.connect();

    event.target.reset();
  }

  useEffect(() => {
    socket.on('connect_error', (err) => {
      console.log(err.message);
      if (err.message === 'invalid username') {
        console.log('invalid username');
        setError('Invalid username');
        userHasAuthenticated(false);
      } else {
        console.log('oops');
      }
    });

    return () => {
      socket.off('connect error');
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      return navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
    <Routes>
      <Route 
        path="/login"
        element={<Login submitHandler={handleSubmit} error={error} />}
      />
      <Route 
        path="/"
        element={isAuthenticated ? <Chat /> : <Navigate to="/login" replace />}
      />
    </Routes>
    </div>
  );
}

export default App;

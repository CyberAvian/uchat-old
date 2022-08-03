import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { socket, SocketContext } from './socket';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <BrowserRouter>
      <SocketContext.Provider value={socket}>
        <App />
      </SocketContext.Provider>
    </BrowserRouter>
  </div>
);

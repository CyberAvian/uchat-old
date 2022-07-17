import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { socket, SocketContext } from './socket';
import './index.css';
import App from './App';

const handleClick = () => {
  if (window.confirm('Are you sure you wish to exit?')) {
    root.unmount();
    createGoodbye();
  }
}

const createGoodbye = () => {
  const rootElement = document.getElementById('root');
  const goodbyeHeader = document.createElement('h1');
  const goodbyeText = document.createTextNode('Goodbye!!!');
  const explanation = document.createElement('p');
  const explanationText = document.createTextNode('Refresh to rejoin chat or close browser to exit.');

  goodbyeHeader.classList.add('goodbye');
  explanation.classList.add('explanation');

  goodbyeHeader.appendChild(goodbyeText);
  explanation.appendChild(explanationText);

  rootElement.appendChild(goodbyeHeader);
  rootElement.appendChild(explanation);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <BrowserRouter>
      <SocketContext.Provider value={socket}>
        <App clickHandler={handleClick} />
      </SocketContext.Provider>
    </BrowserRouter>
  </div>
);

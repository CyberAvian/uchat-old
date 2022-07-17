import React, { useContext } from 'react';
import { SocketContext } from './socket';
import './UserInput.css';

const UserInput = ({ username }) => {
  const socket = useContext(SocketContext);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  const handleClick = (event) => {
    event.preventDefault();
    sendMessage();
  }

  const sendMessage = () => {
    const messageBox = document.getElementById('messageBox');
    var message = messageBox.innerText;

    if (message) {
      socket.emit('set data', 'message', message);
      messageBox.innerText = '';
    }
  }

  return (
    <div className='UserInput'>
      <form id='messageForm' name='messageForm'>
        <div    id="messageBox"
                aria-label="messageBox"
                contentEditable="true"
                data-text="Type here..."
                onKeyPress={handleKeyPress}></div>
        <button type="submit" 
                aria-label="messageSend" 
                id='messageSend'
                onClick={handleClick}>Send</button>
      </form>
    </div>
  );
}

export default UserInput;

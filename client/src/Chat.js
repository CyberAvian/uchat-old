import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { SocketContext } from './socket';
import Menu from './Menu';
import UserInput from './UserInput';
import Message from './Message';
import './Chat.css';

const Chat = ({ username, exitHandler }) => {
  const socket = useContext(SocketContext);

  const [users, setUsers] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [messageElements, setMessageElements] = useState([]);
  const [error, setError] = useState(null);

  // Runs once on mount
  useEffect(() => {
    const resetMessageBox = () => {
      var messageBox = document.getElementById('messageBox');
      messageBox.innerText = '';
      messageBox.focus();
    }

    resetMessageBox();
    // Update Functions
    function updateUsers(...args) {
      setUsers(existingUsers => {
        var userElements = [];
        args.forEach((user) => {
          console.log(user);
          var userElement = <p key={user.socketid}>{user.username}</p>;
          userElements.push(userElement);
        });
        return [...existingUsers, userElements];
      });
    }

    function updateMessages(...args) {
      setMessageList(existingMessages => {
        var messages = [];

        setMessageElements((existingElements) => {
          var messageElements = [];
          var elementCount = existingElements.length;
  
          args.forEach((message, index) => {
            var isSenderUser = message.username === username;

            // Used to position message within the chatbox
            var sender = isSenderUser ? 'self' : 'other';
            
            // Should show username only if the message wasn't sent by the user and wasn't sent by the same user who sent the previous message in the list
            var isPrevUserSame = null;
            if (index === 0) {
              var lastElement = existingElements.length > 0 ? existingElements.length - 1 : null;
              isPrevUserSame = lastElement ? message.username === existingElements[lastElement].props.username : false;
            } else {
              isPrevUserSame = message.username === args[index - 1].username;
            }

            // Determine if the sender of the message needs displayed in chatbox
            var showUsername = 'show';
            if (isSenderUser || isPrevUserSame) {
              showUsername = 'hide';
            }

            var messageElement = <Message key={`${message.username}-${elementCount + messageElements.length}`} 
                                          username={message.username}
                                          text={message.message}
                                          sender={sender}
                                          showUsername={showUsername}
                                          style={message.theme} />
            // messageElement.setAttribute('theme', 'baby-blue-eyes');
            messageElements.push(messageElement);
            messages.push(message);
          });
  
          return [...existingElements, ...messageElements];
        });

        return [...existingMessages, messages];
      });
    }

    // Handle Users
    socket.emit('get data', 'users');

    socket.on('get users', (users) => {updateUsers(...users)});

    socket.on('update users', updateUsers);

    // Handle messages
    socket.emit('get data', 'messages');

    socket.on('get messages', (messages) => {updateMessages(...messages)});
 
    socket.on('update messages', updateMessages);
    
    // Handle Errors
    socket.on('set error', (error) => {
      setError(error);
      alert(error);
    });

    console.log(error);

    // Cleanup
    return () => {
      socket.off('get users');
      socket.off('get messages');
      socket.off('update users');
      socket.off('update messages');
      socket.off('set error');
      socket.disconnect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const scrollChatBox = () => {
      var chatbox = document.getElementById("chatbox");
      chatbox.scrollTop = chatbox.scrollHeight;
    }

    scrollChatBox();
  });

  return (
    <div className='chat' id='chat'>
      {!username && (
        <Navigate to="/" replace={true} />
      )}
      <h1>Chat App</h1>
      <Menu username={username} exitHandler={exitHandler}/>
      <div className='chatwindow'>
        <div className='chatbox' id="chatbox">
          {messageElements}
        </div>
        <div className='userlist' id='userlist'>
          <h2>Users Online</h2>
          {users}
        </div>
      </div>
      <UserInput username={username} />
    </div>
  );
}

export default Chat;

var express = require('express');
var router = express.Router();

const themes = [
  'vodka', 
  'mauve', 
  'baby-blue-eyes', 
  'deep-peach', 
  'tea-green', 
  'melon', 
  'nyanza', 
  'light-hot-pink', 
  'topaz', 
  'pale-green'
];

var users = [];
var messages = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    var socketid = socket.id;
    var user = null;
    var theme = null;

    const sendError = (errorMessage) => {
      socket.emit('set error', errorMessage);
    }

    // Send socket id to user
    console.log(`Connected Socket: ${socket.id}`);
    socket.emit('set id', socket.id);

    // Set theme
    var themeNum = Math.floor(Math.random() * (themes.length - 1));
    theme = themes[themeNum];

    // Update username or messages depending on the data sent from the client
    socket.on('set data', (type, content) => {
      if (content) {
        switch (type) {
          case 'username':
            user = content;
            userObj = {username: user, socketid: socketid};
            users.push(userObj);
            console.log(`Connected User: ${user} at Socket: ${socketid}`);
            socket.emit('set username', user);
            console.log(`Notified Clients of Connected User: ${user} at Socket: ${socketid}`);
            socket.broadcast.emit('update users', userObj);
            break;
          case 'message':
            messageObj = {username: user, message: content, theme: theme};
            messages.push(messageObj);
            console.log(`Message Sent: ${user}: ${content}`);
            io.emit('update messages', messageObj);
            break;
          default:
            console.log(`server error on set ${type} data`);
            sendError('server error')
            break;
        }
      } else {
        console.log(`${type} was not provided`);
        sendError(`${type} required`);
      }
    });

    // Fetch all stored data (mostly used for new connections setting initial data)
    socket.on('get data', (type) => {
      switch (type) {
        case 'users':
          console.log(`Sent current user list to ${user} on socket ${socketid}`);
          socket.emit('get users', users);
          break;
        case 'messages':
          console.log(`Sent current message list to ${user} on socket ${socketid}`);
          socket.emit('get messages', messages);
          break;
        default:
          console.log(`server error on get ${type} data`);
          sendError('server error');
          break;
      }
    });

    // Update user list on disconnect
    socket.on('disconnect', () => {
      users.pop({username: user, socketid: socketid});
      console.log(`Disconnected User: ${user}`);
      socket.emit('update users', users);
    });
  });
  return router;
};

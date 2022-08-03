const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:8080',
  },
});

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

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error('invalid username'));
  }
  // Set username and random theme for connected socket
  socket.username = username;
  var themeNum = Math.floor(Math.random() * (themes.length - 1));
  socket.theme = themes[themeNum];
  next();
});

io.on('connection', (socket) => {
  const users = [];
  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      userID: id,
      username: socket.username,
      theme: socket.theme,
    });
  }
  socket.emit('users', users);
});
const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
  cors: {
    origin: "http://localhost:8080",
  },
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    console.log('invalid username');
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.on('connection', (socket) => {
  const users = [];
  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);
});

const PORT = process.env.PORT || '9000';

httpServer.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);
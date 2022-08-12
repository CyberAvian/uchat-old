const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
  // Need to use cors so the frontend can communicate with the backend
  cors: {
    origin: "http://localhost:8080",
  },
});

// Middleware to authenticate username. Password not necessary
io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  // This check also happens on the frontend. This is an extra layer of security to prevent empty usernames
  if (!username) {
    console.log('invalid username');
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.on('connection', (socket) => {
  console.log(`${socket.username} has connected using socket ${socket.id}`);
  const users = [];
  // Gather all users connected to the current socket server
  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }

  console.log(`Sent connected users to ${socket.username}`);
  socket.emit("users", users);

  // Gather all available rooms
  const rooms = [];
  const unfilteredRooms = Array.from(io.sockets.adapter.rooms);
  // Filter out rooms that match their own socket id (these are private user rooms that we handle from the users list)
  const filteredRooms = unfilteredRooms.filter(room => !room[1].has(room[0]));
  for (let [room, id] of filteredRooms) {
    rooms.push({
      roomID: id.values().next().value,
      roomName: room,
    });
  }

  console.log(`Sent available rooms to ${socket.username}`);
  console.log(rooms);
  socket.emit("rooms", rooms);

  // Broadcast new user information to everyone but the current user
  socket.broadcast.emit("user connected", [{
    userID: socket.id,
    username: socket.username,
  }]);

  // Handle private messages between two users
  socket.on("private message", ({ message, recepient }) => {
    socket.to(recepient).emit("private message", {
      message,
      from: socket.id,
    });
  });

  // For now, disconnected users are removed from the users list
  socket.on("disconnect", () => {
    console.log(`User ${socket.username} disconnected on socket ${socket.id}`);
    socket.broadcast.emit("user disconnected", socket.id);
    users.pop({
      userID: socket.id,
      username: socket.username,
    });
  });
});

const PORT = process.env.PORT || '9000';

httpServer.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);
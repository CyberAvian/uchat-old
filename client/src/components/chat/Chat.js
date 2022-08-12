import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../socket";
import Room from "./Room";
import UserInput from "./UserInput";
import Message from "./Message";
import "./Chat.css";

const Chat = ({ username }) => {
  const socket = useContext(SocketContext);

  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [messageElements, setMessageElements] = useState([]);
  const [error, setError] = useState(null);

  // Runs once on mount
  useEffect(() => {
    const handleUsers = (userList) => {
      console.log("Received users from server");
      saveList(userList, 'user');
    }

    const handleRooms = (roomList) => {
      console.log("Received rooms from server");
      saveList(roomList, 'room');
    }

    const saveList = (list, type) => {
      switch (type) {
        case "user":
          setUsers(existingUsers => {
            var newUsers = [...existingUsers, ...list];
            sortList(newUsers, type);
            return newUsers;
          });
          // When user information is received, private rooms are created using the username and socketID
          setRooms(existingRooms => {
            var privateRooms = []
            list.forEach((user) => {
              privateRooms.push({
                roomID: user.userID,
                roomName: user.username,
              });
            });
            var newRooms = [...existingRooms, ...privateRooms];
            sortList(newRooms, type);
            return newRooms;
          });
          break;
        case "room":
          setRooms(existingRooms => {
            var newRooms = [...existingRooms, ...list];
            sortList(newRooms, type);
            return newRooms;
          });
          break;
        default:
          console.log("Invalid list type");
          break;
      }
    }

    const sortList = (list, type) => {
      switch (type) {
        case "user":
          list.sort((a, b) => {
            if (a.userID === socket.id) {return -1};
            if (b.userID === socket.id) {return 1};
            if (a.username < b.username) {return -1};
            return a.username > b.username ? 1 : 0;
          });
          break;
        case "room":
          list.sort((a, b) => {
            return a.roomName > b.roomName ? 1 : -1;
          });
          break;
        default:
          console.log("invalid list type");
          break;
      }
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
            var sender = isSenderUser ? "self" : "other";
            
            // Should show username only if the message wasn"t sent by the user and wasn"t sent by the same user who sent the previous message in the list
            var isPrevUserSame = null;
            if (index === 0) {
              var lastElement = existingElements.length > 0 ? existingElements.length - 1 : null;
              isPrevUserSame = lastElement ? message.username === existingElements[lastElement].props.username : false;
            } else {
              isPrevUserSame = message.username === args[index - 1].username;
            }

            // Determine if the sender of the message needs displayed in chatbox
            var showUsername = "show";
            if (isSenderUser || isPrevUserSame) {
              showUsername = "hide";
            }

            var messageElement = <Message key={`${message.username}-${elementCount + messageElements.length}`} 
                                          username={message.username}
                                          text={message.message}
                                          sender={sender}
                                          showUsername={showUsername}
                                          style={message.theme} />
            // messageElement.setAttribute("theme", "baby-blue-eyes");
            messageElements.push(messageElement);
            messages.push(message);
          });
  
          return [...existingElements, ...messageElements];
        });

        return [...existingMessages, messages];
      });
    }

    // Handle Users
    socket.on("users", (users) => {handleUsers(users)});
    socket.on("user connected", (user) => {handleUsers(user)});

    // Handle Rooms
    socket.on("rooms", (rooms) => {handleRooms(rooms)});

    // Handle messages
    socket.emit("get data", "messages");
    socket.on("get messages", (messages) => {updateMessages(...messages)});
    socket.on("update messages", updateMessages);

    // Handle Errors
    socket.on("set error", (error) => {
      setError(error);
      alert(error);
    });

    // Cleanup
    return () => {
      socket.off("get users");
      socket.off("get messages");
      socket.off("update users");
      socket.off("update messages");
      socket.off("set error");
    }
  }, []);

  useEffect(() => {
    const scrollChatBox = () => {
      var chatbox = document.querySelector(".messages");
      chatbox.scrollTop = chatbox.scrollHeight;
    }

    scrollChatBox();
  });

  return (
    <div className="chat" id="chat">
      {/* Rooms */}
      <div className="panel" id="rooms">
        <h2>Rooms</h2>
        <ul className="room-list">
          {rooms.map((room) => {
            return <Room key={room.roomID} name={room.roomName} />
          })}
        </ul>
      </div>
      {/* Chat */}
      <div className="chatwindow">
        <div className="messages">{messageElements}</div>
        <UserInput username={username} />
      </div>
      {/* Users */}
      <div className="panel" id="users">
        <h2>Users</h2>
        <ul className="user-list">
          {users.map((user) => {
            return <li key={user.userID}>{user.username}</li>
          })}
        </ul>
      </div>
    </div>
  );
}

export default Chat;

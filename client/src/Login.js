import React, { Component, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { SocketContext } from './socket';
import "./Login.css";

const Login = ({ username, error, submitHandler }) => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    var username = document.getElementById('username');
    username.focus();
  });

  console.log(socket);

  return (
    <div className="login">
      {username && (
        <Navigate to='/chat' replace={true} />
      )}
      <h1>Chat App Login</h1>
      <form name="loginForm" className="form" onSubmit={submitHandler}>
        <label htmlFor="username">Username:</label>
        <p>{error}</p>
        <input type="text" placeholder="Enter a username..." name="username" id="username" required />
        <button type="submit" aria-label="submitUsername">Submit</button>
      </form>
    </div>
  );
}

// class Login extends Component {
//   componentDidMount() {
//     let username = document.getElementById('username');
//     username.focus();
//   }

//   render() {
//     var { username, error, submitHandler } = this.props;
//     console.log('login');
//     return (
//       <div className="login">
//         {username && (
//           <Navigate to='/chat' replace={true} />
//         )}
//         <h1>Chat App Login</h1>
//         <form name="loginForm" className="form" onSubmit={submitHandler}>
//           <label htmlFor="username">Username:</label>
//           <p>{error}</p>
//           <input type="text" placeholder="Enter a username..." name="username" id="username" required />
//           <button type="submit" aria-label="submitUsername">Submit</button>
//         </form>
//       </div>
//     );
//   }
// }

export default Login;

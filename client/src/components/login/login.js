import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./login.css";

const Login = ({ username, error, submitHandler }) => {

  useEffect(() => {
    var username = document.getElementById('username');
    username.focus();
  });

  return (
    <div className="login">
      {console.log('login loaded')}
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

export default Login;

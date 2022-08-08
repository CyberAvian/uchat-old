import React, { useEffect } from "react";
import "./Login.css";

const Login = ({ submitHandler, error }) => {
  useEffect(() => {
    var username = document.getElementById('username');
    username.focus();
  });

  return (
    <div className="login">
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

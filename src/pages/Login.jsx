import React from "react";
import "@/assets/styles/login.css";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-box">
        <form action="#">
          <h1>Sign in</h1>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import "@/assets/styles/login.css";

// TODO: add clean navigation and also refactor this sht code
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const setUsername = (e) => {
    setFormData({ ...formData, username: e.target.value });
  };

  const setPassword = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // TODO: use a clean crud api wrapper
      const response = await axios.post(
        "http://localhost:5000/api/v1/login",
        formData
      );

      // Handle successful login
      console.log(response.data.token);
      // localStorage.setItem("authToken", response.data.token);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
      } else if (error.request) {
        // The request was made but no response was received
      } else {
        // Something happened in setting up the request
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page" onSubmit={handleSubmit}>
      <div className="login-box">
        <form action="#">
          <h1>Sign in</h1>
          <input
            type="username"
            placeholder="Username"
            value={formData.username}
            onChange={setUsername}
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={setPassword}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

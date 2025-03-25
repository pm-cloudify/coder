import "@/assets/styles/login.css";

// TODO: add clean navigation and also refactor this sht code
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();

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
      await login(formData);
    } catch (error) {
      console.log(error);
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

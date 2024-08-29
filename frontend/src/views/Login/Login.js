import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../contexts/AuthContext";

function Login({ onLogin }) {
  const [user, setUser] = useState(null);
  const [authTokens, setAuthTokens] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/token/", {
        username,
        password,
      });

      localStorage.setItem("authTokens", JSON.stringify(response.data));

      // Set the default Authorization header for future requests
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access}`;

      const decodedUser = jwtDecode(response.data.access);
      handleLogin(decodedUser);
      navigate("/");
      console.log("End");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: "300px" }}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
        />
        <button type="submit" style={{ width: "100%", padding: "5px" }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios"; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home"); 
    }
  }, [navigate]);

  
  const { from } = location.state || { from: { pathname: "/home" } };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { username, password });
      const data = response.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username)
      setMessage("Erfolgreich eingeloggt.");
      navigate(from.pathname); // Weiterleiten zum letzten Pfad oder /home
    } catch (error) {
      setMessage("Fehler beim Login: " + error.response.data);
    }
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Einloggen</button>
      </form>
      {message && <p>{message}</p>}
      {/* Button zum Navigieren zur Registrierungsseite */}
      <button onClick={handleNavigateToRegister}>Registrieren</button>
    </div>
  );
};

export default Login;

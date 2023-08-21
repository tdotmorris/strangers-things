import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const cohort = "2305-FTB-ET-WEB-PT";
const BaseURL = `https://strangers-things.herokuapp.com/api/${cohort}`;
const Login = () => {
  const { setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Starting login process...");
    try {
      console.log("Sending fetch request...");
      const response = await fetch(`${BaseURL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: formData, // Nest formData inside 'user' key
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed!");
      }

      const data = await response.json();

      console.log("Received data:", data);

      if (data.data && data.data.token) {
        console.log("Setting Auth Token and Redirecting...");
        setAuthToken(data.token);
        sessionStorage.setItem("token", data.token);
        navigate("/Profile");
      } else {
        console.log("Token not received");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle the error accordingly
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        onChange={handleInputChange}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        onChange={handleInputChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

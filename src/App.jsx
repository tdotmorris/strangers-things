import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Posts from "./components/Posts";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Authenticate from "./components/Authenticate";
import { ToastContainer } from "react-toastify"; // import the ToastContainer
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); // New state to store the username

  useEffect(() => {
    if (token) {
      Authenticate(token)
        .then((data) => {
          if (data && data.username) {
            setIsLoggedIn(true);
            setUsername(data.username); // set the username
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch((err) => {
          setIsLoggedIn(false);
          console.error("Failed to authenticate user:", err);
        });
    }
  }, [token]);

  return (
    <>
      <header className="banner"></header>
      <div id="navbar">
        <Link to={"/"} className="home">
          Home
        </Link>
        <Link to={"/Profile"} className="profile">
          Profile
        </Link>
        <h1 id="logo">Stranger's Things</h1>
       
        <Link to={"/Posts"} className="posts">
          Posts
        </Link>
        {isLoggedIn ? (
          <>
            <span>Welcome back, {username}!</span>
            <button
              onClick={() => {
                setToken(null);
                setUsername(""); 
                setIsLoggedIn(false);
                // <-- Clear the username when logging out
                localStorage.removeItem("authToken");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to={"/Login"} className="login">
            Login
          </Link>
        )}
      </div>
      <div id="contents">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile settoken={setToken} />} />
          <Route
            path="/Posts"
            element={<Posts token={token} username={username} />}
          />
          <Route path="/Login" element={<Login setToken={setToken} />} />
          <Route path="/SignUp" element={<SignUp setToken={setToken} />} />
        </Routes>
      </div>
      <ToastContainer /> {/* This is for showing toast notifications */}
    </>
  );
}

export default App;

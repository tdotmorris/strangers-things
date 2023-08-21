import { useState } from "react";
import "./App.css";
import { FetchAllData } from "./API";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Posts from "./components/Posts";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    
      <>
        <header className="banner"></header>
        <div id="navbar">
          <h1 id="logo">Stranger's Things</h1>
          <Link to={"/"} className="home">
            Home
          </Link>
          <Link to={"/Profile"} className="profile">
            Profile
          </Link>
          <Link to={"/Posts"} className="posts">
            Posts
          </Link>
          <Link to={"/Login"} className="login">
            Login
          </Link>
          <Link to={"/Register"} className="register">
            Register Now
          </Link>
        </div>

        <div id="contents">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Posts" element={<Posts />} />
            <Route path="/Login" element={<Login />} /> 
            <Route path="/Register" element={<Register />} />
          </Routes>
        </div>
      </>
    
  );
}

export default App;

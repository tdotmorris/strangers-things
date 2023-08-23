import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Profile from './components/Profile';
import Posts from './components/Posts';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Authenticate from './components/Authenticate';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      Authenticate(token).then(data => {
        if (data && data.username) { // Adjust based on your API's response
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
           // Clear the invalid token
        }
      }).catch(err => {
        setIsLoggedIn(false);
        console.error("Failed to authenticate user:", err);
      });
    }
  }, [token]);

  return (
    <>
      <header className='banner'></header>
      <div id="navbar">
        <Link to={"/"} className='home'>Home</Link>
        <Link to={"/Profile"} className='profile'>Profile</Link>
        <h1 id='logo'>Stranger's Things</h1>
        <Link to={"/Posts"} className='posts'>Posts</Link>
        {isLoggedIn ? (
         
          <button onClick={() => {
            setToken(null);
            localStorage.removeItem('authToken');
          }}>Logout</button>
        ) : (
          <Link to={"/Login"} className='login'>Login</Link>
        )}
      </div>
      
      <div id='contents'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Posts" element={<Posts />} />
          <Route path="/Login" element={<Login setToken={setToken} />} />
          <Route path="/SignUp" element={<SignUp setToken={setToken} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
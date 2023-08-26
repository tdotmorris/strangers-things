import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Profile from './components/Profile';
import Posts from './components/Posts';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Authenticate from './components/Authenticate';
import EditPost from './components/EditPost';
import Post from './components/Post';
import 'react-toastify/dist/ReactToastify.css';
import { FetchAllData } from './API';

const cohort = '2305-FTB-ET-WEB-PT';
const BaseURL = `https://strangers-things.herokuapp.com/api/${cohort}`;

function App() {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[username,setUsername]=useState('');

  useEffect(() => {
    if (token) {
      Authenticate(token,setUsername)
      .then(data => {
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
          <Route path="/" element={<Home username={username} />} />
          <Route path="/Profile" element={<Profile username={username}/>} />
          <Route path="/Posts" element={<Posts  />} />
          <Route path="/Login" element={<Login setToken={setToken} />} />
          <Route path="/SignUp" element={<SignUp setToken={setToken} />} />
          <Route path="/EditPost" element={<EditPost token={token}/>}/>
          <Route path="/Post" element={<Post/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
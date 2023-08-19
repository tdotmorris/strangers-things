import { useState } from 'react'
import './App.css'
import { FetchAllData } from './API'
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Profile from './components/Profile';
import Posts from './components/Posts';
import Login from './components/Login';

function App() {
 

  return (
   
    <>
     <header className='banner'></header>
      < div id="navbar">
      <h1 id='logo'>Stranger's Things</h1>
        <Link to={"/"} className='home'>Home</Link>
        <Link to={"/Profile"} className='profile'>Profile</Link>
        <Link to={"/Posts"} className='posts'>Posts</Link>
        <Link to={"/Login"} className='login'>Login</Link>
      </div>
    

      <div id='contents'>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Posts" element={<Posts/>}/>
        <Route path="/Login" element={<Login/>}/>
      </Routes>

      </div>
    </>
  )
}

export default App

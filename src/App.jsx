import { useState } from 'react'
import './App.css'
import { FetchAllData } from './API'
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Profile from './components/Profile';
import Posts from './components/Posts';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Authenticate from './components/Authenticate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



function App() {
  const[token,setToken]=useState(null)
    //if(!token){
      //return<Login setToken={setToken}/>
   // }

  return (
   
    <>
     <header className='banner'></header>
      < div id="navbar">
        <Link to={"/"} className='home'>Home</Link>
        <Link to={"/Profile"} className='profile'>Profile</Link>
        <h1 id='logo'>Stranger's Things</h1>
        <Link to={"/Posts"} className='posts'>Posts</Link>
        <Link to={"/Login"} className='login'>Login</Link>
      </div>
    

      <div id='contents'>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Posts" element={<Posts/>}/>
        <Route path="/Login" element={<Login token={token}/>}/>
        <Route path="/SignUp" element={<SignUp setToken={setToken} token={token}/>}/>
        <Route path="/Authenticate" element={<Authenticate  setToken={setToken} token={token}/>}/>
      </Routes>
      
      </div>
    </>
  )
}

export default App

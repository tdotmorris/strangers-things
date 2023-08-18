import { useState } from 'react'
import './App.css'
import { FetchAllData } from './API'
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Profile from './components/Profile';
import Posts from './components/Posts';
function App() {
 

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Posts" element={<Posts/>}/>
        <Route />
      </Routes>
    </>
  )
}

export default App

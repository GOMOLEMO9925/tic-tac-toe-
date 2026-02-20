import React from 'react'
import {BrowserRouter, Routes, } from 'react-router-dom'
import Home from './pages/Home/Home'
function Router() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>|}/>
    </Routes>
    <div>
      
    </div>
  )
}

export default Router

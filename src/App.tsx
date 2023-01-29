import React from 'react';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;

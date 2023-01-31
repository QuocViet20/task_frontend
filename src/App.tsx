import React from 'react';
import Header from './components/layout/Header';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/homPage/HomePage';
import Login from './pages/loginPage/Login';
import Register from './pages/registerPage/Register';
import UserForm from './pages/createUserPage/UserForm';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/createUser" element={<UserForm />} />
    </Routes>
  );
}

export default App;

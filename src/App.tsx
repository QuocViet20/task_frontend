import React from 'react';
import Header from './components/layout/Header';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/homPage/HomePage';
import Login from './pages/loginPage/Login';
import Register from './pages/registerPage/Register';
import CreateUser from './pages/createUserPage/CreateUserPage';
import CreateTaskPage from './pages/createTaskPage/CreateTaskPage';
import EditTaskPage from './pages/editTaskpage/EditTaskPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/createUser" element={<CreateUser />} />
      <Route path="/createTask" element={<CreateTaskPage />} />
      <Route path="/editTask/:taskId" element={<EditTaskPage />} />
    </Routes>
  );
}

export default App;

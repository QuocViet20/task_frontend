import React from 'react';
import Header from './components/layout/Header';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/homPage/HomePage';
import Login from './pages/loginPage/Login';
import Register from './pages/registerPage/Register';
import CreateUser from './pages/createUserPage/CreateUserPage';
import CreateTaskPage from './pages/createTaskPage/CreateTaskPage';
import EditTaskPage from './pages/editTaskpage/EditTaskPage';
import UserListPage from './pages/userListPage/UserListPage';
import UserInformation from './pages/userInfomationPage/UserInfomationPage';
import EditUserPage from './pages/editUser/EditUser';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/createUser" element={<CreateUser />} />
      <Route path="/createTask" element={<CreateTaskPage />} />
      <Route path="/editTask/:taskId" element={<EditTaskPage />} />
      <Route path="/users" element={<UserListPage />} />
      <Route path="/users/:userId" element={<UserInformation />} />
      <Route path="/editUser/:userId" element={<EditUserPage />} />
    </Routes>
  );
}

export default App;

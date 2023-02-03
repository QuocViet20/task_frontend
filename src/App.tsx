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
import ResetPasswordPage from './pages/resetPasswordPage/ResetPasswordPage';
import TaskListPage from './pages/tasksListPage/TaskListPgae';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/createUser" element={<CreateUser />} />
      <Route path="/createTask" element={<CreateTaskPage />} />
      <Route path="/tasks/:taskId/edit" element={<EditTaskPage />} />
      <Route path="/users" element={<UserListPage />} />
      <Route path="/users/:userId" element={<UserInformation />} />
      <Route path="/users/:userId/edit" element={<EditUserPage />} />
      <Route path="/users/:userId/resetPassword" element={<ResetPasswordPage />} />
      <Route path="/tasks" element={<TaskListPage />} />
    </Routes>
  );
}

export default App;

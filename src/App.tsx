import React from 'react';
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
import HomePage from './pages/homPage/HomePage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import PageLayout from './components/layout/pageLayout/PageLayout';
import { Navigate } from 'react-router-dom';

// type
import { RoutePath } from './types';
import useAuth from './hooks/useAuth';
import MyTaskPage from './pages/myTask/MyTask';


function App() {
  const { isLoggedIn, authData, isLoggedAdmin } = useAuth();

  const publicPages = [
    {
      path: `${RoutePath.Home}`,
      element: <HomePage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
    {
      path: `${RoutePath.Register}`,
      element: <Register />,
    },
  ];

  const authPages = [
    {
      path: `${RoutePath.Login}`,
      element: <Login />,
    },
  ];

  const protectedPages = [
    {
      path: `${RoutePath.TaskList}`,
      element: <TaskListPage />,
    },
    {
      path: `${RoutePath.UserList}`,
      element: <UserListPage />,
    },
    {
      path: `${RoutePath.CreateTask}`,
      element: <CreateTaskPage />,
    },
    {
      path: `${RoutePath.CreateUser}`,
      element: <CreateUser />,
    },
    {
      path: `${RoutePath.EditTask}`,
      element: <EditTaskPage />,
    },
    {
      path: `${RoutePath.EditUser}`,
      element: <EditUserPage />,
    },
    {
      path: `${RoutePath.InfomationUser}`,
      element: <UserInformation />,
    },
    {
      path: `${RoutePath.ResetPasswordUser}`,
      element: <ResetPasswordPage />,
    },
    {
      path: `${RoutePath.MyTasks}`,
      element: <MyTaskPage />,
    },
  ];

  return (
    <Routes>
      {publicPages.map((publicPage) => (
        <Route
          key={publicPage.path}
          path={publicPage.path}
          element={<PageLayout>{publicPage.element}</PageLayout>}
        />
      ))}
      {authPages.map((authPage) => (
        <Route
          key={authPage.path}
          path={authPage.path}
          element={
            (isLoggedAdmin || isLoggedIn) ? <Navigate to={RoutePath.Home} /> : authPage.element
          }
        />
      ))}
      {protectedPages.map((protectedPage) => (
        <Route
          key={protectedPage.path}
          path={protectedPage.path}
          element={
            isLoggedIn && authData.role ? (
              <PageLayout>{protectedPage.element}</PageLayout>
            ) : (
              <Navigate to={RoutePath.Login} />
            )
          }
        />
      ))}
    </Routes>
  );
}

export default App;

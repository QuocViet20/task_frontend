import { Routes, Route, Navigate } from 'react-router-dom'
import PageLayout from "../components/layout/pageLayout/PageLayout";
import HomePage from "../pages/common/homePage/HomePage";
import NotFoundPage from "../pages/common/notFoundPage/NotFoundPage";
import Register from "../pages/authPages/registerPage/Register";
import { RoutePath } from "../types";
import TaskListPage from "../pages/tasks/tasksListPage/TaskListPgae";
import UserListPage from "../pages/users/userListPage/UserListPage";
import CreateTaskPage from "../pages/tasks/createTaskPage/CreateTaskPage";
import CreateUser from "../pages/users/createUserPage/CreateUserPage";
import EditUserPage from "../pages/users/editUser/EditUser";
import EditTaskPage from "../pages/tasks/editTaskpage/EditTaskPage";
import UserInformation from "../pages/users/userInfomationPage/UserInfomationPage";
import ResetPasswordPage from "../pages/users/resetPasswordPage/ResetPasswordPage";
import MyInformation from "../pages/users/myInfomation/MyInformation";
import Login from '../pages/authPages/loginPage/Login';

//hooks
import useAuth from "../hooks/useAuth";


const RoutesPage = () => {
  const { authData, isLoggedIn, isLoggedAdmin } = useAuth();

  const publicPages = [
    {
      path: `${RoutePath.Home}`,
      element: <HomePage />,
    },
    {
      path: `${RoutePath.NotFound}`,
      element: <NotFoundPage />,
    },
    {
      path: `${RoutePath.Register}`,
      element: <Register />,
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
      path: `${RoutePath.MyInfomation}`,
      element: <MyInformation />,
    },
  ];

  const protectedAdminPage = [
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
      path: `${RoutePath.MyInfomation}`,
      element: <MyInformation />,
    },
  ]
  const authPages = [
    {
      path: `${RoutePath.Login}`,
      element: <Login />,
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

      {protectedAdminPage.map((protectedPage) => (
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
          {protectedPages.map((protectedPage) => (
        <Route
          key={protectedPage.path}
          path={protectedPage.path}
          element={
            authData.role === "Admin" ? (
              <PageLayout>{protectedPage.element}</PageLayout>
            ) : (
              <Navigate to={RoutePath.Home} />
            )
          }
        />
      ))}
    </Routes>
  )
}

export default RoutesPage
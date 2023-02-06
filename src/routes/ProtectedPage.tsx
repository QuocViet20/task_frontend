import { Routes, Route,Navigate } from "react-router-dom";
import { RoutePath } from "../types";

//hooks
import useAuth from "../hooks/useAuth";

//components
import PageLayout from "../components/layout/pageLayout/PageLayout";
import TaskListPage from "../pages/tasks/tasksListPage/TaskListPgae";
import UserListPage from "../pages/users/userListPage/UserListPage";
import CreateTaskPage from "../pages/tasks/createTaskPage/CreateTaskPage";
import CreateTaskAdminPage from "../pages/tasks/createTaskAdmin/CreateTaskAdmin";
import CreateUser from "../pages/users/createUserPage/CreateUserPage";
import EditUserPage from "../pages/users/editUser/EditUser";
import EditTaskPage from "../pages/tasks/editTaskpage/EditTaskPage";
import UserInformation from "../pages/users/userInfomationPage/UserInfomationPage";
import ResetPasswordPage from "../pages/users/resetPasswordPage/ResetPasswordPage";
import MyTaskPage from "../pages/tasks/myTask/MyTask";
import MyInformation from "../pages/users/myInfomation/MyInformation";


const ProtectedPages = () => {
  const { authData, isLoggedIn } = useAuth();

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
      path: `${RoutePath.CreateTaskAdmin}`,
      element: <CreateTaskAdminPage />,
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
    {
      path: `${RoutePath.MyInfomation}`,
      element: <MyInformation />,
    },
  ];

  return (
    <Routes>
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
  )

}

export default ProtectedPages
import Login from "../pages/authPages/loginPage/Login"
import { Routes, Route, Navigate } from "react-router-dom"
import { RoutePath } from "../types";
import useAuth from "../hooks/useAuth";
const AuthPages = () => {

  const { isLoggedAdmin, isLoggedIn } = useAuth();

  const authPages = [
    {
      path: `${RoutePath.Login}`,
      element: <Login />,
    },
  ];
  return (
    <Routes>
          {authPages.map((authPage) => (
        <Route
          key={authPage.path}
          path={authPage.path}
          element={
            (isLoggedAdmin || isLoggedIn) ? <Navigate to={RoutePath.Home} /> : authPage.element
          }
        />
      ))}
    </Routes>
  )
}

export default AuthPages
import HomePage from "../pages/common/homePage/HomePage";
import NotFoundPage from "../pages/common/notFoundPage/NotFoundPage";
import Register from "../pages/authPages/registerPage/Register";
import { RoutePath } from "../types";
import { Routes, Route } from 'react-router-dom'
import PageLayout from "../components/layout/pageLayout/PageLayout";
import useAuth from "../hooks/useAuth";

const  PublicPages = () => {
  const { isLoggedIn } = useAuth()
  const publicPagesArr = [
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

  return (
    <Routes>
    { publicPagesArr.map((publicPage) => (
      <Route
        key={publicPage.path}
        path={publicPage.path}
        element={<PageLayout>{publicPage.element}</PageLayout>}
      />
    ))}
    </Routes>
  );
}

export default PublicPages

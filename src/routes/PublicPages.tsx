import HomePage from "../pages/common/homePage/HomePage";
import NotFoundPage from "../pages/common/notFoundPage/NotFoundPage";
import Register from "../pages/authPages/registerPage/Register";
import { RoutePath } from "../types";
import { Routes, Route } from 'react-router-dom'
import PageLayout from "../components/layout/pageLayout/PageLayout";

const PublicPages = () => {
  const publicPages = [
    {
      path: `${RoutePath.Home}`,
      element: <HomePage />,
    },
    {
      path: `${RoutePath.Register}`,
      element: <Register />,
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
    </Routes>
  );
}

export default PublicPages

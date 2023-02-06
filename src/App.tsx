
import PublicPages from './routes/PublicPages';
import AuthPages from './routes/AuthPage';
import ProtectedPages from './routes/ProtectedPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//hook
import useAuth from './hooks/useAuth';
import PageLayout from './components/layout/pageLayout/PageLayout';
import NotFoundPage from './pages/common/notFoundPage/NotFoundPage';

function App() {
  const { isLoggedIn, authData } = useAuth();

  return (
    <>
      <AuthPages />
      <PublicPages />
      <ProtectedPages />
    </>

  );
}

export default App;

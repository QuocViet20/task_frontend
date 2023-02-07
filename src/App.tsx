
import PublicPages from './routes/PublicPages';
import AuthPages from './routes/AuthPage';
import ProtectedPages from './routes/ProtectedPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <>
      <AuthPages />
      <PublicPages />
      <ProtectedPages />
    </>

  );
}

export default App;

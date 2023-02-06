
import PublicPages from './routes/PublicPages';
import AuthPages from './routes/AuthPage';
import ProtectedPages from './routes/ProtectedPage';


function App() {

  return (
    <>
    <PublicPages />
    <AuthPages />
    <ProtectedPages />
    </>
 
  );
}

export default App;

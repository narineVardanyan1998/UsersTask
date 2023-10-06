import './App.css';
import { Home } from './views/Home/Home';
import { UserProvider } from './context/UserContext';
import { SnackbarProvider } from 'notistack';
import { Routes, Route } from 'react-router-dom';
import { User } from './views/User/User';

function App() {
  return (
    <>
      <SnackbarProvider>
        <UserProvider>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<User />} path="/user/:id" />
          </Routes>
        </UserProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;

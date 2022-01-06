import Login from '@pages/Authentication/Login/Login';
import Register from '@pages/Authentication/Register/Register';
import Main from '@pages/Main/Main';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './pages/Authentication/Authentication';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Authentication Children={<Login />} />} />
      <Route
        path="/register"
        element={<Authentication Children={<Register />} />}
      />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}

export default App;

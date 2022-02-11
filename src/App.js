import Login from '@pages/Authentication/Login/Login';
import Register from '@pages/Authentication/Register/Register';
import Main from '@pages/Main/Main';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './pages/Authentication/Authentication';
import TestSetup from '@pages/TestSetup/TestSetup';
import TestPlay from '@pages/TestPlay/TestPlay';
import NotFound from '@components/NotFound/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main/1" replace={true} />} />
      <Route path="/main" element={<Navigate to="/main/1" replace={true} />} />
      <Route path="/login" element={<Authentication Children={<Login />} />} />
      <Route
        path="/register"
        element={<Authentication Children={<Register />} />}
      />
      <Route path="/main/:page" element={<Main />} />
      <Route path="/create" element={<TestSetup />} />
      <Route path="/edit/:id" element={<TestSetup />} />
      <Route path="/play/:id" element={<TestPlay />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

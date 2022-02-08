import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import styles from './Main.module.css';
import TestList from './TestList/TestList';

const Main = () => {
  const login = useSelector((state) => state.user.login);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const navigate = useNavigate();
  useEffect(() => {
    if (login === '') {
      navigate('/login');
    }
  });

  const [filter, setFilter] = useState('');

  return (
    <div className={styles.container}>
      <Dashboard
        login={login}
        isAdmin={isAdmin}
        filter={filter}
        setFilter={setFilter}
      />
      <TestList filter={filter} />
    </div>
  );
};

export default memo(Main);

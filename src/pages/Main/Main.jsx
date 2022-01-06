import { memo } from 'react';
import Dashboard from './Dashboard/Dashboard';
import styles from './Main.module.css';

const Main = () => {
  return (
    <>
      <Dashboard />
    </>
  );
};

export default memo(Main);

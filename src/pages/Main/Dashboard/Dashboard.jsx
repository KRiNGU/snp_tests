import styles from './Dashboard.module.css';
import { memo } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <ul className={styles.container}>
      <li className={styles.menuElement}></li>
      <li className={styles.menuElement}>
        <Link to="/login">Выйти</Link>
      </li>
      <li className={styles.menuElement}>
        <Link to="/create">Создать тест</Link>
      </li>
    </ul>
  );
};

export default memo(Dashboard);

import styles from './Dashboard.module.css';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Dashboard = ({ login, isAdmin, filter, setFilter }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChangeFilter = useCallback(
    (e) => {
      setFilter(e.target.value);
    },
    [setFilter]
  );

  const handleLogout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  }, [navigate, dispatch]);

  const handleCreateTest = useCallback(() => {
    dispatch({ type: 'ADD_TEST' });
    navigate('/create');
  }, [dispatch, navigate]);

  return (
    <ul className={styles.container}>
      <li className={styles.menuElement}>
        <h2 className={styles.login}>{login}</h2>
        <h3 className={styles.isAdmin}>
          {isAdmin ? 'Администратор' : 'Пользователь'}
        </h3>
      </li>
      <li className={styles.menuElement}>
        <input
          type="text"
          className={styles.filter}
          placeholder="Введите название"
          value={filter}
          onChange={handleChangeFilter}
        />
      </li>
      <li className={styles.menuElement}>
        <button className={styles.button} onClick={handleLogout}>
          Выйти
        </button>
      </li>
      {isAdmin && (
        <li className={styles.menuElement}>
          <button className={styles.button} onClick={handleCreateTest}>
            Создать тест
          </button>
        </li>
      )}
    </ul>
  );
};

export default memo(Dashboard);

import styles from './Dashboard.module.css';
import { memo, useCallback } from 'react';

const Dashboard = ({
  login,
  isAdmin,
  filter,
  setFilter,
  onLogout,
  onCreateTest,
}) => {
  const handleChangeFilter = useCallback(
    (e) => {
      setFilter(e.target.value);
    },
    [setFilter]
  );

  return (
    <div className={styles.container}>
      <ul className={styles.content}>
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
          <button className={styles.button} onClick={onLogout}>
            Выйти
          </button>
        </li>
        {isAdmin && (
          <li className={styles.menuElement}>
            <button className={styles.button} onClick={onCreateTest}>
              Создать тест
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default memo(Dashboard);

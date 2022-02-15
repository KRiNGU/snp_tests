import styles from './Dashboard.module.css';
import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';

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

Dashboard.propTypes = {
  login: PropTypes.string,
  isAdmin: PropTypes.bool,
  filter: PropTypes.string,
  setFilter: PropTypes.func,
  onLogout: PropTypes.func,
  onCreateTest: PropTypes.func,
};

export default memo(Dashboard);

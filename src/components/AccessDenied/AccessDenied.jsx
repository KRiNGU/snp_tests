import { memo } from 'react';
import styles from './AccessDenied.module.css';

const AccessDenied = () => (
  <h1 className={styles.text}>Доступ закрыт для обычных пользователей</h1>
);

export default memo(AccessDenied);

import { memo } from 'react';
import styles from './NotFound.module.css';

const NotFound = () => <h1 className={styles.text}>Страница не найдена</h1>;

export default memo(NotFound);

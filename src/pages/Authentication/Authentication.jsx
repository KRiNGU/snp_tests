import styles from './Authentication.module.css';
import { memo } from 'react';

const Authentication = ({ Children }) => (
  <div className={styles.container}>{Children}</div>
);

export default memo(Authentication);

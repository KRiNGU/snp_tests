import { memo } from 'react';
import styles from './ListHeader.module.css';
import classnames from 'classnames';

const ListHeader = ({ additionalStyles, columnFilter, setColumnFilter }) => (
  <ul className={styles.header}>
    <li className={classnames(styles.columnHeader, additionalStyles.id)}>
      <button
        className={styles.buttonColumnFilter}
        disabled={columnFilter === 'id'}
        value="id"
        onClick={setColumnFilter}
      >
        ID
      </button>
    </li>
    <li className={classnames(styles.columnHeader, additionalStyles.name)}>
      <button
        className={styles.buttonColumnFilter}
        disabled={columnFilter === 'name'}
        value="name"
        onClick={setColumnFilter}
      >
        Название
      </button>
    </li>
    <li
      className={classnames(styles.columnHeader, additionalStyles.description)}
    >
      <button
        className={styles.buttonColumnFilter}
        disabled={columnFilter === 'description'}
        value="description"
        onClick={setColumnFilter}
      >
        Описание
      </button>
    </li>
    <li className={classnames(styles.columnHeader, additionalStyles.date)}>
      <button
        className={styles.buttonColumnFilter}
        disabled={columnFilter === 'date'}
        value="date"
        onClick={setColumnFilter}
      >
        Дата создания
      </button>
    </li>
  </ul>
);

export default memo(ListHeader);

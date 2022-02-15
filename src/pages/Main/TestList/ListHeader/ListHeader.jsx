import { memo } from 'react';
import styles from './ListHeader.module.css';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ListHeader = ({ classNames, columnFilter, setColumnFilter }) => {
  return (
    <ul className={styles.header}>
      <li className={classnames(styles.columnHeader, classNames.id)}>
        <button
          className={styles.buttonColumnFilter}
          disabled={columnFilter === 'id'}
          value="id"
          onClick={setColumnFilter}
        >
          ID
        </button>
      </li>
      <li className={classnames(styles.columnHeader, classNames.name)}>
        <button
          className={styles.buttonColumnFilter}
          disabled={columnFilter === 'name'}
          value="name"
          onClick={setColumnFilter}
        >
          Название
        </button>
      </li>
      <li className={classnames(styles.columnHeader, classNames.description)}>
        <button
          className={styles.buttonColumnFilter}
          disabled={columnFilter === 'description'}
          value="description"
          onClick={setColumnFilter}
        >
          Описание
        </button>
      </li>
      <li className={classnames(styles.columnHeader, classNames.date)}>
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
};

ListHeader.propTypes = {
  classNames: PropTypes.object,
  columnFilter: PropTypes.string,
  setColumnFilter: PropTypes.func,
};

export default memo(ListHeader);

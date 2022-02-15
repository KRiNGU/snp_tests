import { sortByParameter } from '@utils/utils';
import { memo, useCallback, useState } from 'react';
import ListElement from './ListElement.jsx/ListElement';
import ListHeader from './ListHeader/ListHeader';
import styles from './TestList.module.css';
import PropTypes from 'prop-types';

const TestList = ({
  tests,
  onElementClick = () => {},
  onSetColumnFilter = () => {},
}) => {
  const classNames = {
    id: styles.id,
    name: styles.name,
    description: styles.description,
    date: styles.date,
  };
  const [columnFilter, setColumnFilter] = useState('date');

  const handleSetColumnFilter = (e) => {
    setColumnFilter(e.target.value);
    onSetColumnFilter(e.target.value);
  };

  const handleElementClick = useCallback(
    (id) => {
      onElementClick(id);
    },
    [onElementClick]
  );

  return (
    <div className={styles.container}>
      <ListHeader
        classNames={classNames}
        columnFilter={columnFilter}
        setColumnFilter={handleSetColumnFilter}
      />
      {sortByParameter(tests, columnFilter).map((test) => (
        <ListElement
          key={test.id}
          classNames={classNames}
          id={test.id}
          name={test.name}
          description={test.description}
          date={test.date}
          onClick={handleElementClick}
        />
      ))}
    </div>
  );
};

TestList.propTypes = {
  tests: PropTypes.arrayOf(PropTypes.object),
  onElementClick: PropTypes.func,
  onSetColumnFilter: PropTypes.func,
};

export default memo(TestList);

import Button from '@components/Button/Button';
import { sortByParameter } from '@utils/utils';
import { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ListElement from './ListElement.jsx/ListElement';
import ListHeader from './ListHeader/ListHeader';
import styles from './TestList.module.css';

const TestList = ({ filter }) => {
  const additionalStyles = {
    id: styles.id,
    name: styles.name,
    description: styles.description,
    date: styles.date,
  };
  const dispatch = useDispatch();
  let { page } = useParams();
  page = parseInt(page);
  const navigate = useNavigate();
  const [columnFilter, setColumnFilter] = useState('date');
  const tests = useSelector((state) =>
    state.tests.items.filter(
      (test) => test.name.includes(filter) || filter === ''
    )
  );
  useEffect(() => {
    dispatch({
      type: 'LOAD_TESTS',
    });
  }, [dispatch]);
  const lastPage = ~~(tests.length / 10 + 1);

  const handleSetColumnFilter = (e) => {
    setColumnFilter(e.target.value);
  };

  const incrementPage = useCallback(() => {
    navigate(`/main/${page + 1}`);
  }, [navigate, page]);

  const decrementPage = useCallback(() => {
    navigate(`/main/${page - 1}`);
  }, [navigate, page]);

  return (
    <div className={styles.container}>
      <ListHeader
        additionalStyles={additionalStyles}
        columnFilter={columnFilter}
        setColumnFilter={handleSetColumnFilter}
      />
      {sortByParameter(tests, columnFilter)
        .slice((page - 1) * 10, page * 10)
        .map((test) => (
          <ListElement
            key={test.id}
            additionalStyles={additionalStyles}
            id={test.id}
            name={test.name}
            description={test.description}
            date={test.date}
          />
        ))}
      <ul className={styles.pages}>
        {page !== 1 && (
          <Button
            text={page - 1}
            className={styles.page}
            onClick={decrementPage}
          />
        )}
        <Button text={page} className={styles.page} disabled />
        {page !== lastPage && (
          <Button
            text={page + 1}
            className={styles.page}
            onClick={incrementPage}
          />
        )}
      </ul>
    </div>
  );
};

export default memo(TestList);

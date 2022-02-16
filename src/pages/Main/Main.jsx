import Button from '@components/Button/Button';
import Modal from '@components/Modal/Modal';
import { disableScroll, enableScroll } from '@utils/utils';
import { useCallback } from 'react';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import styles from './Main.module.css';
import TestList from './TestList/TestList';
import { BiLogOut, BiListPlus } from 'react-icons/bi';
import classnames from 'classnames';

const Main = () => {
  const login = useSelector((state) => state.user.login);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const dispatch = useDispatch();
  let { page } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (page !== parseInt(page).toString()) {
      console.log(parseInt(page));
      navigate(`/main/${parseInt(page)}`);
    }
  }, [navigate, page]);
  page = parseInt(page);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('date');
  const lastPage = useSelector((state) => state.tests.lastPage);
  useEffect(() => {
    dispatch({
      type: 'LOAD_TESTS_BY_PAGE',
      payload: { page, limit: 10, filter, sort },
    });
  }, [dispatch, page, filter, sort]);

  const [isPlayModalOpened, setIsPlayModalOpened] = useState(false);
  const [potentialPlayId, setPotentialPlayId] = useState();
  const tests = useSelector((state) =>
    state.tests.items.filter((test) => test.name.includes(filter))
  );
  useEffect(() => {
    if (login === '') {
      navigate('/login');
    }
  });

  const handleLogout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  }, [navigate, dispatch]);

  const handleCreateTest = useCallback(() => {
    dispatch({ type: 'ADD_TEST' });
    navigate('/create');
  }, [dispatch, navigate]);

  const incrementPage = useCallback(() => {
    navigate(`/main/${page + 1}`);
  }, [navigate, page]);

  const decrementPage = useCallback(() => {
    navigate(`/main/${page - 1}`);
  }, [navigate, page]);

  const handleChangeFilter = useCallback(
    (e) => {
      setFilter(e.target.value);
    },
    [setFilter]
  );

  const handleElementClick = useCallback(
    (id) => {
      disableScroll();
      setIsPlayModalOpened(true);
      setPotentialPlayId(id);
    },
    [setIsPlayModalOpened, setPotentialPlayId]
  );

  const handleAcceptPlay = useCallback(() => {
    enableScroll();
    navigate(`/play/${potentialPlayId}`);
  }, [navigate, potentialPlayId]);

  const handleDeclinePlay = useCallback(() => {
    enableScroll();
    setIsPlayModalOpened(false);
  }, [setIsPlayModalOpened]);

  const handleSetColumnFilter = useCallback(
    (sort) => {
      setSort(sort);
    },
    [setSort]
  );

  const moveToLastPage = useCallback(() => {
    navigate(`/main/${lastPage}`);
  }, [navigate, lastPage]);

  return (
    <div className={styles.container}>
      {isPlayModalOpened && (
        <Modal
          title="Пройти тест?"
          firstButtonText="Начать"
          secondButtonText="Отмена"
          firstButtonClickAction={handleAcceptPlay}
          secondButtonClickAction={handleDeclinePlay}
        />
      )}
      <input
        type="text"
        className={styles.mobileFilter}
        placeholder="Введите название"
        value={filter}
        onChange={handleChangeFilter}
      />
      {isAdmin && (
        <Button
          text={<BiListPlus />}
          className={classnames(
            styles.createTestButton,
            styles.mobileControlButton
          )}
          onClick={handleCreateTest}
        />
      )}
      <Button
        text={<BiLogOut />}
        className={classnames(styles.logoutButton, styles.mobileControlButton)}
        onClick={handleLogout}
      />
      <Dashboard
        login={login}
        isAdmin={isAdmin}
        filter={filter}
        setFilter={setFilter}
        onLogout={handleLogout}
        onCreateTest={handleCreateTest}
      />
      <TestList
        tests={tests}
        onElementClick={handleElementClick}
        onSetColumnFilter={handleSetColumnFilter}
      />
      {page <= lastPage && (
        <ul className={styles.pages}>
          {page !== 1 && (
            <Button
              text={page - 1}
              className={styles.page}
              onClick={decrementPage}
            />
          )}
          <Button text={page} className={styles.page} disabled />
          {page < lastPage && (
            <Button
              text={page + 1}
              className={styles.page}
              onClick={incrementPage}
            />
          )}
        </ul>
      )}
      {page > lastPage && (
        <ul className={styles.pages}>
          <Button
            text={lastPage}
            className={styles.page}
            onClick={moveToLastPage}
          />
        </ul>
      )}
    </div>
  );
};

export default memo(Main);

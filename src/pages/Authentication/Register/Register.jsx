import Button from '@components/Button/Button';
import Checkbox from '@components/Checkbox/Checkbox';
import Input from '@components/Input/Input';
import SecondaryButton from '@components/SecondaryButton/SecondaryButton';
import { getErrorMessage } from '@utils/utils';
import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const errorMessage = getErrorMessage({ error, section: 'user' });

  const handleChangeLogin = useCallback(
    (e) => {
      setLogin(e.target.value);
    },
    [setLogin]
  );

  const handleChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  const handleChangeAdminPassword = useCallback(
    (e) => {
      setAdminPassword(e.target.value);
    },
    [setAdminPassword]
  );

  const hangleRegisterUser = useCallback(() => {
    dispatch({
      type: 'SIGN_UP',
      payload: { login, password, adminPassword, isAdmin },
    });
  }, [dispatch, login, password, adminPassword, isAdmin]);

  const handleLoginClick = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const handleChangeRegisterMode = useCallback(() => {
    setIsAdmin(!isAdmin);
  }, [isAdmin]);

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <ul className={styles.inputs}>
          <li className={styles.input}>
            <Input
              inputLabel={styles.inputLabel}
              input={styles.field}
              errorLabel={styles.errorLabel}
              placeholder="Введите логин"
              value={login}
              onChange={handleChangeLogin}
              inputText="Логин"
              error={error}
              errorMessage={errorMessage}
            />
          </li>
          <li className={styles.input}>
            <Input
              inputLabel={styles.inputLabel}
              input={styles.field}
              errorLabel={styles.errorLabel}
              placeholder="Введите пароль"
              value={password}
              onChange={handleChangePassword}
              inputText="Пароль"
              error={error}
              errorMessage={errorMessage}
            />
          </li>
          {isAdmin && (
            <li className={styles.input}>
              <Input
                inputLabel={styles.inputLabel}
                input={styles.field}
                errorLabel={styles.errorLabel}
                placeholder="Введите пароль администратора"
                value={adminPassword}
                onChange={handleChangeAdminPassword}
                inputText="Пароль администратора"
                error={error}
                errorMessage={errorMessage}
              />
            </li>
          )}
          <Checkbox
            text={'Зарегистрироваться как администратор'}
            onClick={handleChangeRegisterMode}
            checkboxContainer={styles.checkboxContainer}
          />
          <Button
            text="Зарегистрироваться"
            className={styles.loginButton}
            onClick={hangleRegisterUser}
          />
          <SecondaryButton
            text="Войти"
            className={styles.loginButton}
            onClick={handleLoginClick}
          />
        </ul>
      </div>
    </div>
  );
};

export default memo(Register);

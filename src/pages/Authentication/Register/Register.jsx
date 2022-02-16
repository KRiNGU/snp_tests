import Button from '@components/Button/Button';
import Checkbox from '@components/Checkbox/Checkbox';
import Input from '@components/Input/Input';
import SecondaryButton from '@components/SecondaryButton/SecondaryButton';
import { restoreError } from '@redux/user/slice';
import { userErrors, validateName, validatePassword } from '@utils/errorCodes';
import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeLogin = useCallback(
    ({ value }) => {
      setLoginError(validateName(value));
      setLogin(value);
    },
    [setLogin, setLoginError]
  );

  const handleChangePassword = useCallback(
    ({ value }) => {
      setPassword(value);
      setPasswordError(validatePassword(value));
    },
    [setPassword, setPasswordError]
  );

  const handleChangeAdminPassword = useCallback(
    ({ value }) => {
      setAdminPassword(value);
    },
    [setAdminPassword]
  );

  const hangleRegisterUser = useCallback(() => {
    dispatch({
      type: 'SIGN_UP',
      payload: {
        login,
        password,
        adminPassword,
        isAdmin,
        move: () => {
          navigate(`/login`);
        },
      },
    });
  }, [dispatch, login, password, adminPassword, isAdmin, navigate]);

  const handleLoginClick = useCallback(() => {
    dispatch({ type: restoreError });
    navigate('/login');
  }, [navigate, dispatch]);

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
              error={loginError}
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
              error={passwordError}
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
              />
            </li>
          )}
          <Checkbox
            text={'Зарегистрироваться как администратор'}
            onChange={handleChangeRegisterMode}
            className={{ container: styles.checkboxContainer }}
            checked={isAdmin}
          />
          <Button
            text="Зарегистрироваться"
            className={styles.loginButton}
            onClick={hangleRegisterUser}
            disabled={loginError !== '' || passwordError !== ''}
          />
          <label className={styles.errorLabel}>{userErrors[error]}</label>
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

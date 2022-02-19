import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import SecondaryButton from '@components/SecondaryButton/SecondaryButton';
import { userErrors, validateName, validatePassword } from '@utils/errorCodes';
import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { restoreError } from '@redux/user/slice';

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(localStorage.getItem('login'));
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(validateName(login));
  const [passwordError, setPasswordError] = useState('');
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  const handleChangeLogin = useCallback(
    ({ value }) => {
      setLogin(value);
      setLoginError(validateName(value));
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

  const handleSignIn = useCallback(() => {
    dispatch({
      type: 'SIGN_IN',
      payload: { login, password, move: () => navigate('/main/1') },
    });
    setPassword('');
  }, [dispatch, navigate, login, password]);

  const handleRegisterClick = useCallback(() => {
    dispatch({ type: restoreError });
    navigate('/register');
  }, [navigate, dispatch]);

  return (
    <div className={styles.background}>
      <form className={styles.inputs}>
        <Input
          input={styles.field}
          inputLabel={styles.inputLabel}
          errorLabel={styles.errorLabel}
          placeholder="Введите логин"
          value={login}
          onChange={handleChangeLogin}
          inputText="Логин"
          validator={validateName}
          container={styles.input}
        />
        <Input
          container={styles.input}
          input={styles.field}
          inputLabel={styles.inputLabel}
          errorLabel={styles.errorLabel}
          placeholder="Введите пароль"
          value={password}
          onChange={handleChangePassword}
          inputText="Пароль"
          validator={validatePassword}
          type="password"
        />
        <Button
          text="Войти"
          className={styles.loginButton}
          onClick={handleSignIn}
          disabled={loginError !== '' || passwordError !== ''}
        />
        <label className={styles.errorLabel}>{userErrors[error]}</label>
        <SecondaryButton
          text="Зарегистрироваться"
          className={styles.loginButton}
          onClick={handleRegisterClick}
        />
      </form>
    </div>
  );
};

export default memo(Login);

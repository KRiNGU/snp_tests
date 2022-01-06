import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import SecondaryButton from '@components/SecondaryButton/SecondaryButton';
import { getErrorMessage } from '@utils/utils';
import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSignIn = useCallback(() => {
    dispatch({
      type: 'SIGN_IN',
      payload: { login, password, move: () => navigate('/main') },
    });
    setPassword('');
  }, [dispatch, navigate, login, password]);

  const handleRegisterClick = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  return (
    <div className={styles.background}>
      <ul className={styles.inputs}>
        <li className={styles.input}>
          <Input
            input={styles.field}
            inputLabel={styles.inputLabel}
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
            input={styles.field}
            inputLabel={styles.inputLabel}
            errorLabel={styles.errorLabel}
            placeholder="Введите пароль"
            value={password}
            onChange={handleChangePassword}
            inputText="Пароль"
            error={error}
            errorMessage={errorMessage}
          />
        </li>
        <Button
          text="Войти"
          className={styles.loginButton}
          onClick={handleSignIn}
        />
        <SecondaryButton
          text="Зарегистрироваться"
          className={styles.loginButton}
          onClick={handleRegisterClick}
        />
      </ul>
    </div>
  );
};

export default memo(Login);

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
  const [isLoginValid, setIsLoginValid] = useState(login !== '');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  const handleChangeLogin = useCallback(
    ({ value, isValid }) => {
      setLogin(value);
      setIsLoginValid(isValid);
    },
    [setLogin, setIsLoginValid]
  );

  const handleChangePassword = useCallback(
    ({ value, isValid }) => {
      setPassword(value);
      setIsPasswordValid(isValid);
    },
    [setPassword, setIsPasswordValid]
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
            validator={validateName}
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
            validator={validatePassword}
          />
        </li>
        <Button
          text="Войти"
          className={styles.loginButton}
          onClick={handleSignIn}
          disabled={!isPasswordValid || !isLoginValid}
        />
        <label className={styles.errorLabel}>{userErrors[error]}</label>
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

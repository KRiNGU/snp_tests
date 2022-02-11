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
  const [isLoginValid, setIsLoginValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();
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
              validator={validateName}
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
              validator={validatePassword}
              inputText="Пароль"
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
            disabled={!isLoginValid || !isPasswordValid}
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

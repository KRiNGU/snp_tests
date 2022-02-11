export const userErrors = {
  423: 'Пароль администратора не совпадает',
  400: 'Пользователь уже существует',
  204: 'Неправильный логин или пароль',
};

export const validateName = (text) => {
  if (!text) {
    return 'Введите имя';
  } else if (/^[A-Za-z0-9_-]+$/.test(text)) {
    return 0;
  } else
    return 'Имя должно содержать только символы английского алфавита, цифры, _ или -';
};

export const validatePassword = (text) => {
  if (!text) {
    return 'Введите пароль';
  } else if (!/^[A-Za-z0-9_]+$/.test(text)) {
    return 'Пароль должен содержать только символы английского алфавита, цифры или _';
  } else if (!/.{5,}/.test(text)) {
    return 'Пароль должен содержать 5 и более символов';
  } else if (!/[a-zA-Z]+/.test(text) || !/[0-9]+/.test(text)) {
    return 'Пароль должен включать минимум одну букву и цифру';
  } else return 0;
};

export const validateInputQuestion = (text) => {
  if (!text) {
    return 'Ответ не может быть пустым';
  }
  return 0;
};

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

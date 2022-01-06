import axios from 'axios';

const defaultHeaders = {};

const defaultBodyHeaders = {
  ...defaultHeaders,
  'Content-Type': 'application/json',
};

const mainAxios = axios.create({
  baseURL: 'http://localhost:3001',
  headers: defaultBodyHeaders,
});

export const getUserByLogin = ({ login, password }) =>
  mainAxios.get(`/user?login=${login}&password=${password}`);

export const getUserByLoginWithoutPass = ({ login }) =>
  mainAxios.get(`/user?login=${login}`);

export const registerUser = ({ login, password, isAdmin }) =>
  mainAxios.post(`/user`, {
    login: login,
    password: password,
    isAdmin: isAdmin,
  });

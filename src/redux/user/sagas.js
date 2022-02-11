import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getUserByLogin as getUserByLoginApi,
  registerUser as registerUserApi,
  getUserByLoginWithoutPass as getUserByLoginWithoutPassApi,
} from '@api/user';
import * as reducers from './slice';
import { adminPassword as currentAdminPassword } from '@config';

export function* workSignUp({
  payload: { login, password, isAdmin, adminPassword, move },
}) {
  try {
    if (isAdmin && adminPassword !== currentAdminPassword) {
      yield put(reducers.signUpFailure({ error: 423 }));
      return;
    }
    const response = yield call(getUserByLoginWithoutPassApi, { login });
    const data = response.data[0];
    if (!data) {
      yield call(registerUserApi, {
        login: login.toLowerCase(),
        password,
        isAdmin,
      });
      yield put(reducers.signUpSuccess());
      move();
    } else {
      yield put(reducers.signUpFailure({ error: 400 }));
    }
  } catch (err) {}
}

export function* workSignIn({ payload: { login, password, move } }) {
  try {
    const response = yield call(getUserByLoginApi, {
      login: login.toLowerCase(),
      password,
    });
    const data = response?.data[0];
    if (!data) {
      yield put(reducers.signInFailure({ error: 204 }));
      return;
    }
    yield put(reducers.signInSuccess(data));
    move();
  } catch (err) {}
}

export function* workLogout() {
  try {
    yield put(reducers.logout());
  } catch (e) {}
}

export default function* rootSaga() {
  yield takeLatest('SIGN_IN', workSignIn);
  yield takeLatest('SIGN_UP', workSignUp);
  yield takeLatest('LOGOUT', workLogout);
}

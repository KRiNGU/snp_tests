import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/slice';
import testsReducer from './tests/slice';
import userSaga from './user/sagas';
import testsSaga from './tests/sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export const store = configureStore({
  reducer: { user: userReducer, tests: testsReducer },
  middleware: middlewares,
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(userSaga);
sagaMiddleware.run(testsSaga);

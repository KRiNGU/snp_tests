import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/slice';
import userSaga from './user/sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export const store = configureStore({
  reducer: { user: userReducer },
  middleware: middlewares,
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(userSaga);

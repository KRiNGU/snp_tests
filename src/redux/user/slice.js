import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: localStorage.getItem('login') ?? '',
  isAdmin: JSON.parse(localStorage.getItem('isAdmin')) ?? false,
  error: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInSuccess: (state, { payload }) => {
      localStorage.setItem('login', payload.login);
      localStorage.setItem('isAdmin', payload.isAdmin);
      state.login = payload.login;
      state.isAdmin = payload.isAdmin;
      state.error = 0;
    },
    signInFailure: (state, { payload }) => {
      state.error = payload.error;
    },
    signUpSuccess: (state) => {
      state.error = 0;
    },
    signUpFailure: (state, { payload }) => {
      state.error = payload.error;
    },
    logout: (state) => {
      localStorage.setItem('login', '');
      localStorage.setItem('isAdmin', false);
      state.login = '';
      state.isAdmin = false;
    },
    restoreError: (state) => {
      state.error = 0;
    },
  },
});

export const {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
  logout,
  restoreError,
} = userSlice.actions;

export default userSlice.reducer;

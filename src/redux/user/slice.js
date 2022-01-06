import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: localStorage.getItem('login') ?? '',
  isAdmin: localStorage.getItem('isAdmin') ?? false,
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
  },
});

export const { signInSuccess, signInFailure, signUpSuccess, signUpFailure } =
  userSlice.actions;

export default userSlice.reducer;

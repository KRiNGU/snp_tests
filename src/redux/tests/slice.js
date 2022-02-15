import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  lastPage: 0,
  currentTest: {
    id: null,
    name: '',
    description: '',
    date: '',
    questions: [],
    answers: [],
  },
};

export const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    getTests: (state, { payload }) => {
      state.items = payload.tests;
      state.lastPage = payload.lastPage;
    },
    getQuestions: (state, { payload }) => {
      state.currentTest.questions = payload.questions;
    },
    getCurrentTest: (state, { payload }) => {
      state.currentTest.name = payload.name;
      state.currentTest.description = payload.description;
      state.currentTest.id = payload.id;
      state.currentTest.date = payload.date;
    },
    addAnswers: (state, { payload }) => {
      state.currentTest.answers = state.currentTest.answers.concat(
        payload.answers
      );
    },
    addQuestion: (state, { payload }) => {
      state.currentTest.questions.push(payload.newQuestion);
    },
    changeTestName: (state, { payload }) => {
      state.currentTest.name = payload.name;
    },
    changeTestDescription: (state, { payload }) => {
      state.currentTest.description = payload.description;
    },
    deleteTest: (state, { payload }) => {
      state.items.filter((test) => test.id !== payload.id);
      if (state.currentTest.id === payload.id) {
        state.currentTest = {
          id: null,
          name: '',
          description: '',
          date: '',
          questions: [],
          answers: [],
        };
      }
    },
    clearCurrentTest: (state) => {
      state.currentTest = {
        id: null,
        name: '',
        description: '',
        date: '',
        questions: [],
        answers: [],
      };
    },
    clearCurrentTestData: (state) => {
      state.currentTest.questions = [];
      state.currentTest.answers = [];
    },
  },
});

export const {
  getTests,
  getQuestions,
  getCurrentTest,
  addAnswers,
  addQuestion,
  changeTestName,
  changeTestDescription,
  deleteTest,
  clearCurrentTest,
  clearCurrentTestData,
} = testsSlice.actions;

export default testsSlice.reducer;

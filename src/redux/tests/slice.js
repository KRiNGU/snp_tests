import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
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
    changeAnswer: (state, { payload }) => {
      state.currentTest.answers.find(
        (answer) => answer.id === payload.id
      ).name = payload.name;
    },
    addQuestion: (state, { payload }) => {
      state.currentTest.questions.push(payload.newQuestion);
    },
    changeQuestionName: (state, { payload }) => {
      state.currentTest.questions.find(
        (question) => question.id === payload.id
      ).name = payload.name;
    },
    changeQuestionRightAnswer: (state, { payload }) => {
      state.currentTest.questions.find(
        (question) => question.id === payload.id
      ).rightAnswerId = payload.rightAnswerId;
    },
    deleteAnswer: (state, { payload }) => {
      state.currentTest.answers = state.currentTest.answers.filter(
        (answer) => answer.id !== payload.id
      );
    },
    deleteQuestion: (state, { payload }) => {
      state.currentTest.questions = state.currentTest.questions.filter(
        (question) => question.id !== payload.id
      );
      state.currentTest.answers = state.currentTest.answers.filter(
        (answer) => answer.questionId !== payload.id
      );
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
  changeAnswer,
  changeQuestionName,
  changeQuestionRightAnswer,
  deleteAnswer,
  addQuestion,
  deleteQuestion,
  changeTestName,
  changeTestDescription,
  deleteTest,
  clearCurrentTest,
  clearCurrentTestData,
} = testsSlice.actions;

export default testsSlice.reducer;

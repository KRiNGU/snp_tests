import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createTest as createTestApi,
  getTestsByPage as getTestsByPageApi,
  getTestById as getTestByIdApi,
  getQuestionsOfOneTest as getQuestionsOfOneTestApi,
  getAnswersOfOneQuestion as getAnswersOfOneQuestionApi,
  addAnswer as addAnswerApi,
  deleteQuestion as deleteQuestionApi,
  changeTestName as changeTestNameApi,
  changeTestDescription as changeTestDescriptionApi,
  deleteTest as deleteTestApi,
  addQuestion as addQuestionApi,
} from '@api/tests';
import * as reducers from './slice';

///////////////////////////////////////////////            WORK WITH TESTS            ///////////////////////////////////////////////

export function* workAddTest() {
  try {
    yield put(reducers.clearCurrentTest());
    const response = yield call(createTestApi);
    yield put(reducers.getCurrentTest(response.data));
  } catch (e) {}
}

export function* workChangeTestName({ payload: { testId, name } }) {
  try {
    yield call(changeTestNameApi, { id: testId, name });
    yield put(reducers.changeTestName({ name }));
  } catch (e) {}
}

export function* workChangeTestDesription({
  payload: { testId, description },
}) {
  try {
    yield call(changeTestDescriptionApi, { id: testId, description });
    yield put(reducers.changeTestDescription({ description }));
  } catch (e) {}
}

export function* workDeleteTest({ payload: { id } }) {
  try {
    yield call(deleteTestApi, { id });
    yield put(reducers.deleteTest({ id }));
  } catch (e) {}
}

export function* workSaveTestData({
  payload: { answers, questions, testId, name, description },
}) {
  const oldQuestionsResponse = yield call(getQuestionsOfOneTestApi, { testId });
  yield call(workChangeTestName, { payload: { testId, name } });
  yield call(workChangeTestDesription, { payload: { testId, description } });
  for (const question of oldQuestionsResponse.data) {
    yield call(deleteQuestionApi, { id: question.id });
    yield put(reducers.clearCurrentTestData());
  }
  try {
    for (const question of questions) {
      yield call(addQuestionApi, {
        id: question.id,
        name: question.name,
        testId: question.testId,
        rightAnswerId: question.rightAnswerId,
        type: question.type,
      });
      yield put(reducers.addQuestion({ newQuestion: question }));
    }
  } catch (e) {}
  try {
    for (const answer of answers) {
      yield call(addAnswerApi, {
        id: answer.id,
        name: answer.name,
        questionId: answer.questionId,
        order: answer.order,
      });
      yield put(reducers.addAnswers({ answers: [answer] }));
    }
  } catch (e) {}
}

///////////////////////////////////////////////            LOAD ALL TEST            ///////////////////////////////////////////////

export function* workLoadTestsByPage({
  payload: { page, sort, filter, limit },
}) {
  try {
    const response = yield call(getTestsByPageApi, {
      page,
      sort,
      filter,
      limit,
    });
    const totalFound = parseInt(response.headers['x-total-count']);
    const lastPage =
      ~~(totalFound / limit) + (totalFound % limit === 0 ? 0 : 1);
    yield put(reducers.getTests({ tests: response.data, lastPage }));
  } catch (e) {}
}

///////////////////////////////////////////////            LOAD TEST            ///////////////////////////////////////////////

export function* workLoadAnswerByQuestionId({ questionId }) {
  try {
    const answersResponse = yield call(getAnswersOfOneQuestionApi, {
      questionId,
    });
    const answers = answersResponse.data;
    yield put(reducers.addAnswers({ answers, questionId }));
  } catch (e) {}
}

export function* workLoadTestById({ payload: { id } }) {
  try {
    if (!id) {
      return;
    }
    const testResponse = yield call(getTestByIdApi, { id });
    const questionResponse = yield call(getQuestionsOfOneTestApi, {
      testId: id,
    });

    const testData = testResponse.data;
    const questions = questionResponse.data;
    yield put(reducers.clearCurrentTestData());
    for (const elem of questions) {
      yield workLoadAnswerByQuestionId({ questionId: elem.id });
    }

    yield put(reducers.getQuestions({ questions }));
    yield put(reducers.getCurrentTest({ ...testData, id }));
  } catch (e) {}
}

export default function* rootSaga() {
  yield takeLatest('LOAD_TEST_BY_ID', workLoadTestById);
  yield takeLatest('LOAD_TESTS_BY_PAGE', workLoadTestsByPage);
  yield takeLatest('ADD_TEST', workAddTest);
  yield takeLatest('DELETE_TEST', workDeleteTest);
  yield takeLatest('SAVE_TEST_DATA', workSaveTestData);
}

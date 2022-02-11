import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createTest as createTestApi,
  getTests as getTestsApi,
  getTestsByPage as getTestsByPageApi,
  getTestById as getTestByIdApi,
  getQuestionsOfOneTest as getQuestionsOfOneTestApi,
  getAnswersOfOneQuestion as getAnswersOfOneQuestionApi,
  changeAsnwer as changeAnswerApi,
  changeQuestionName as changeQuestionNameApi,
  changeQuestionRightAnswer as changeQuestionRightAnswerApi,
  addAnswer as addAnswerApi,
  deleteAnswerById as deleteAnswerByIdApi,
  addTextQuestion as addTextQuestionApi,
  addNumericQuestion as addNumericQuestionApi,
  deleteQuestion as deleteQuestionApi,
  changeTestName as changeTestNameApi,
  changeTestDescription as changeTestDescriptionApi,
  deleteTest as deleteTestApi,
  addQuestion as addQuestionApi,
} from '@api/tests';
import * as reducers from './slice';

///////////////////////////////////////////////            WORK WITH QUESTIONS            ///////////////////////////////////////////////

export function* workChangeQuestionName({ payload: { id, name } }) {
  try {
    yield call(changeQuestionNameApi, { id, name });
    yield put(reducers.changeQuestionName({ id, name }));
  } catch (e) {}
}

export function* workChangeRightAnswer({ payload: { id, rightAnswerId } }) {
  try {
    yield call(changeQuestionRightAnswerApi, { id, rightAnswerId });
    yield put(reducers.changeQuestionRightAnswer({ id, rightAnswerId }));
  } catch (e) {}
}

export function* workAddTextQuestion({ payload: { testId } }) {
  try {
    const response = yield call(addTextQuestionApi, { testId });
    yield put(reducers.addQuestion({ newQuestion: response.data }));
  } catch (e) {}
}

export function* workAddNumericQuestion({ payload: { testId } }) {
  try {
    const questionResponse = yield call(addNumericQuestionApi, { testId });
    const answerResponse = yield call(addAnswerApi, {
      name: 0,
      questionId: questionResponse.data.id,
    });
    yield call(changeQuestionRightAnswerApi, {
      id: questionResponse.data.id,
      rightAnswerId: answerResponse.data.id,
    });
    let questionData = questionResponse.data;
    questionData.rightAnswerId = answerResponse.data.id;
    yield put(reducers.addAnswers({ answers: [answerResponse.data] }));
    yield put(reducers.addQuestion({ newQuestion: questionData }));
  } catch (e) {}
}

export function* workDeleteQuestion({ payload: { id } }) {
  try {
    yield call(deleteQuestionApi, { id });
    // yield call(deleteAnswerQuestionsApi, { questionId: id });
    yield put(reducers.deleteQuestion({ id }));
  } catch (e) {}
}

///////////////////////////////////////////////            WORK WITH ANSWERS            ///////////////////////////////////////////////

export function* workChangeAnswer({ payload: { id, name } }) {
  try {
    yield call(changeAnswerApi, { id, name });
    yield put(reducers.changeAnswer({ id, name }));
  } catch (e) {}
}

export function* workAddAnswer({ payload: { questionId } }) {
  try {
    const response = yield call(addAnswerApi, {
      name: 'Введите имя ответа',
      questionId,
    });
    yield put(reducers.addAnswers({ answers: [response.data] }));
    return response;
  } catch (e) {}
}

export function* workDeleteAnswer({ payload: { id } }) {
  try {
    yield call(deleteAnswerByIdApi, { id });
    yield put(reducers.deleteAnswer({ id }));
  } catch (e) {}
}

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

export function* workLoadTestsByPage({ payload: { page } }) {
  try {
    const response = yield call(getTestsByPageApi, { page });
    yield put(reducers.getTests({ tests: response.data }));
  } catch (e) {}
}

export function* workLoadTests() {
  try {
    const response = yield call(getTestsApi);
    yield put(reducers.getTests({ tests: response.data }));
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
  yield takeLatest('LOAD_TESTS', workLoadTests);
  yield takeLatest('CHANGE_TEST_NAME', workChangeTestName);
  yield takeLatest('CHANGE_TEST_DESCRIPTION', workChangeTestDesription);
  yield takeLatest('ADD_TEST', workAddTest);
  yield takeLatest('CHANGE_ANSWER', workChangeAnswer);
  yield takeLatest('CHANGE_RIGHT_ANSWER', workChangeRightAnswer);
  yield takeLatest('CHANGE_QUESTION_NAME', workChangeQuestionName);
  yield takeLatest('ADD_ANSWER', workAddAnswer);
  yield takeLatest('DELETE_ANSWER', workDeleteAnswer);
  yield takeLatest('ADD_TEXT_QUESTION', workAddTextQuestion);
  yield takeLatest('ADD_NUMERIC_QUESTION', workAddNumericQuestion);
  yield takeLatest('DELETE_QUESTION', workDeleteQuestion);
  yield takeLatest('DELETE_TEST', workDeleteTest);
  yield takeLatest('SAVE_TEST_DATA', workSaveTestData);
}

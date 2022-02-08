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

////////////////////////////////////////////////////           Test API           ////////////////////////////////////////////////////

export const getTestById = ({ id }) => mainAxios.get(`/tests/${id}`);

export const createTest = () => {
  const date = new Date();
  const formattedDate =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  return mainAxios.post(`/tests`, {
    name: 'Введите имя',
    description: 'Введите описание',
    date: formattedDate,
  });
};

export const getTestsByNameAndPage = ({ name, page }) =>
  mainAxios.get(`/test?_page=${page}&name=${name}`);

export const getTests = () => mainAxios.get(`/tests`);

export const getTestsByPage = ({ page }) =>
  mainAxios.get(`/tests?_page=${page}`);

export const changeTestName = ({ id, name }) =>
  mainAxios.patch(`/tests/${id}`, { name });

export const changeTestDescription = ({ id, description }) =>
  mainAxios.patch(`/tests/${id}`, { description });

export const deleteTest = ({ id }) => mainAxios.delete(`/tests/${id}`);

////////////////////////////////////////////////////           Questions API           ////////////////////////////////////////////////////

export const getQuestionsOfOneTest = ({ testId }) =>
  mainAxios.get(`/questions?testId=${testId}`);

export const getQuetionById = ({ id }) => mainAxios.get(`/questions/${id}`);

export const changeQuestionName = ({ id, name }) =>
  mainAxios.patch(`/questions/${id}`, { name });

export const changeQuestionRightAnswer = ({ id, rightAnswerId }) =>
  mainAxios.patch(`/questions/${id}`, { rightAnswerId });

export const addNumericQuestion = ({ testId }) =>
  mainAxios.post(`/questions/`, {
    name: 'Введите вопрос',
    rightAnswerId: null,
    testId,
  });

export const addTextQuestion = ({ testId }) =>
  mainAxios.post(`/questions/`, {
    name: 'Введите вопрос',
    rightAnswerId: [],
    testId,
  });

export const addQuestion = ({ id, name, rightAnswerId, testId }) =>
  mainAxios.post(`/questions`, {
    id: id,
    name: name,
    rightAnswerId: rightAnswerId,
    testId: testId,
  });

export const deleteQuestion = ({ id }) => mainAxios.delete(`/questions/${id}`);

////////////////////////////////////////////////////           Answers API           ////////////////////////////////////////////////////

export const addAnswer = ({ id, name, questionId, order }) =>
  mainAxios.post(`/answers`, { id, name, questionId, order });

export const getAnswersOfOneQuestion = ({ questionId }) =>
  mainAxios.get(`/answers?questionId=${questionId}`);

export const getAnswersById = ({ id }) => mainAxios.get(`/answers/${id}`);

export const changeAsnwer = ({ id, name }) =>
  mainAxios.patch(`/answers/${id}`, { name });

export const deleteAnswerById = ({ id }) => mainAxios.delete(`/answers/${id}`);

export const deleteAnswerQuestions = ({ questionId }) =>
  mainAxios.delete(`/answers?questionId=${questionId}`);

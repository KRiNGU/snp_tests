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

export const getTestsByPage = ({ page, sort, filter, limit }) =>
  mainAxios.get(
    `/tests?_page=${page}&_limit=${limit}&name_like=${filter}&_sort=${sort}&_order=asc`
  );

export const changeTestName = ({ id, name }) =>
  mainAxios.patch(`/tests/${id}`, { name });

export const changeTestDescription = ({ id, description }) =>
  mainAxios.patch(`/tests/${id}`, { description });

export const deleteTest = ({ id }) => mainAxios.delete(`/tests/${id}`);

////////////////////////////////////////////////////           Questions API           ////////////////////////////////////////////////////

export const getQuestionsOfOneTest = ({ testId }) =>
  mainAxios.get(`/questions?testId=${testId}`);

export const getQuetionById = ({ id }) => mainAxios.get(`/questions/${id}`);

export const addQuestion = ({ id, name, rightAnswerId, testId, type }) =>
  mainAxios.post(`/questions`, {
    id,
    name,
    rightAnswerId,
    testId,
    type,
  });

export const deleteQuestion = ({ id }) => mainAxios.delete(`/questions/${id}`);

////////////////////////////////////////////////////           Answers API           ////////////////////////////////////////////////////

export const addAnswer = ({ id, name, questionId, order }) =>
  mainAxios.post(`/answers`, { id, name, questionId, order });

export const getAnswersOfOneQuestion = ({ questionId }) =>
  mainAxios.get(`/answers?questionId=${questionId}`);

export const getAnswersById = ({ id }) => mainAxios.get(`/answers/${id}`);

export const deleteAnswerQuestions = ({ questionId }) =>
  mainAxios.delete(`/answers?questionId=${questionId}`);

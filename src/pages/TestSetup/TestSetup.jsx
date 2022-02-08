import AccessDenied from '@components/AccessDenied/AccessDenied';
import Button from '@components/Button/Button';
import CenteredPaper from '@components/CenteredPaper/CenteredPaper';
import Modal from '@components/Modal/Modal';
import classnames from 'classnames';
import { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './TestSetup.module.css';
import TestsList from './TestsList/TestsList';

const TestSetup = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const currentTest = useSelector((state) => state.tests.currentTest);
  const isAdmin = useSelector((state) => state.user.isAdmin);

  useEffect(() => {
    if (id && !currentTest.name) {
      dispatch({ type: 'LOAD_TEST_BY_ID', payload: { id } });
    }
  }, [dispatch, id, currentTest.name]);

  const nId = useSelector((state) => state.tests?.currentTest?.id);
  id = id ?? nId;

  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const html = document.documentElement;
  const { body } = document;

  const navigate = useNavigate();

  useEffect(() => {
    setName(currentTest.name);
    setDescription(currentTest.description);
    setQuestions(currentTest.questions);
    setAnswers(currentTest.answers);
  }, [
    currentTest.name,
    setName,
    setDescription,
    currentTest.description,
    setAnswers,
    currentTest.answers,
    setQuestions,
    currentTest.questions,
  ]);
  window.onscroll = () => {};

  const handleChangeTestName = useCallback(
    ({ value }) => {
      setName(value);
    },
    [setName]
  );

  const handleChangeTestDescription = useCallback(
    ({ value }) => {
      setDescription(value);
    },
    [setDescription]
  );

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleDelete = (e) => {
    disableScroll();
    setIsDeleteModalOpened(true);
  };

  const disableScroll = useCallback(() => {
    const scrollBarWidth = window.innerWidth - html.clientWidth;
    const bodyPaddingRight =
      parseInt(
        window.getComputedStyle(body).getPropertyValue('padding-right')
      ) || 0;
    html.style.position = 'relative';
    html.style.overflow = 'hidden';
    body.style.position = 'relative';
    body.style.overflow = 'hidden';
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;
  }, [html, body]);

  const enableScroll = useCallback(() => {
    html.style.position = '';
    html.style.overflow = '';
    body.style.position = '';
    body.style.overflow = '';
    body.style.paddingRight = '';
  }, [html, body]);

  const handleAcceptDelete = useCallback(() => {
    enableScroll();
    dispatch({ type: 'DELETE_TEST', payload: { id } });
    navigate(-1);
  }, [enableScroll, dispatch, id, navigate]);

  const handleDeclineDelete = useCallback(() => {
    enableScroll();
    setIsDeleteModalOpened(false);
  }, [enableScroll, setIsDeleteModalOpened]);

  const handleDeleteQuestion = useCallback(
    (id) => {
      setQuestions(questions.filter((question) => question.id !== id));
      setAnswers(answers.filter((answer) => answer.questionId !== id));
    },
    [setQuestions, questions, setAnswers, answers]
  );

  const handleAddAnswer = useCallback(
    ({ qId, aId, isWithoutText = false }) => {
      console.log(aId);
      setAnswers([
        ...answers,
        {
          id: aId,
          name: isWithoutText ? '' : 'Введите ответ',
          questionId: qId,
        },
      ]);
    },
    [setAnswers, answers]
  );

  const handleAddTextQuestion = useCallback(() => {
    const qId = Date.now();
    setAnswers([
      ...answers,
      { id: qId + 1, name: 'Введите ответ', questionId: qId },
      { id: qId + 2, name: 'Введите ответ', questionId: qId },
    ]);
    setQuestions([
      ...questions,
      {
        id: qId,
        name: 'Введите вопрос',
        rightAnswerId: [],
        testId: id,
      },
    ]);
  }, [setQuestions, questions, id, setAnswers, answers]);

  const handleAddNumericQuestion = useCallback(() => {
    const qId = Date.now();
    const aId = qId + 1;
    handleAddAnswer({ qId, aId, isWithoutText: true });
    setQuestions([
      ...questions,
      {
        id: qId,
        name: 'Введите вопрос',
        rightAnswerId: aId,
        testId: id,
      },
    ]);
  }, [setQuestions, questions, id, handleAddAnswer]);

  const handleDeleteAnswer = useCallback(
    (aId) => {
      setAnswers(answers.filter((answer) => answer.id !== aId));
    },
    [setAnswers, answers]
  );

  const handleEditAnswer = useCallback(
    ({ aId, name }) => {
      let newAnswers = JSON.parse(JSON.stringify(answers));
      newAnswers.find((answer) => answer.id === aId).name = name;
      setAnswers(newAnswers);
    },
    [answers, setAnswers]
  );

  const handleEditQuestionName = useCallback(
    ({ qId, name }) => {
      let newQuestions = JSON.parse(JSON.stringify(questions));
      newQuestions.find((answer) => answer.id === qId).name = name;
      setQuestions(newQuestions);
    },
    [questions, setQuestions]
  );

  const handleToggleRightAnswer = useCallback(
    ({ qId, newRightAnswerId }) => {
      let newQuestions = JSON.parse(JSON.stringify(questions));
      newQuestions.find((answer) => answer.id === qId).rightAnswerId =
        newRightAnswerId;
      setQuestions(newQuestions);
    },
    [questions, setQuestions]
  );

  const saveChanges = useCallback(() => {
    dispatch({
      type: 'SAVE_TEST_DATA',
      payload: { answers, questions, testId: id, name, description },
    });
  }, [dispatch, answers, questions, id, name, description]);

  if (!currentTest.id) {
    return <></>;
  }

  console.log(typeof isAdmin);

  if (isAdmin === false) {
    return <AccessDenied />;
  }

  return (
    <main
      className={classnames(
        styles.container,
        isDeleteModalOpened && styles.noScroll
      )}
    >
      {isDeleteModalOpened && (
        <Modal
          title="Удалить?"
          firstButtonText="Удалить"
          secondButtonText="Отмена"
          firstButtonClickAction={handleAcceptDelete}
          secondButtonClickAction={handleDeclineDelete}
        />
      )}
      <Button
        onClick={handleBack}
        text={'Вернуться'}
        className={styles.backButton}
      />
      <CenteredPaper
        id={id}
        defaultValue={name}
        onChange={handleChangeTestName}
        className={{
          value: styles.name,
          edit: styles.editName,
          container: styles.nameContainer,
        }}
        isEditable
      />
      <CenteredPaper
        id={id}
        defaultValue={description}
        onChange={handleChangeTestDescription}
        className={{
          value: styles.name,
          edit: styles.editName,
          container: styles.descriptionContainer,
        }}
        isEditable
      />
      <TestsList
        answers={answers}
        questions={questions}
        onDeleteQuestion={handleDeleteQuestion}
        onDeleteAnswer={handleDeleteAnswer}
        onAddAnswer={handleAddAnswer}
        onEditAnswer={handleEditAnswer}
        onEditQuestionName={handleEditQuestionName}
        onToggleRightAnswer={handleToggleRightAnswer}
      />
      <div className={styles.addButtons}>
        <Button
          text="Добавить числовой вопрос"
          className={styles.addButton}
          onClick={handleAddNumericQuestion}
        />
        <Button
          text="Добавить текстовый вопрос"
          className={styles.addButton}
          onClick={handleAddTextQuestion}
        />
      </div>
      <Button
        onClick={saveChanges}
        text={
          description
            ? name
              ? 'Сохранить'
              : 'Введите название'
            : 'Введите описание'
        }
        className={classnames(styles.controlButton, styles.saveButton)}
        disabled={!name || !description}
      />
      <Button
        onClick={handleDelete}
        text={'Удалить тест'}
        className={classnames(styles.controlButton, styles.deleteButton)}
      />
    </main>
  );
};

export default memo(TestSetup);

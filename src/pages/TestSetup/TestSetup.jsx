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
import { enableScroll, disableScroll } from '@utils/utils';
import { useCheckMobileScreen } from '@utils/hooks';

const TestSetup = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const currentTest = useSelector((state) => state.tests.currentTest);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const isMobile = useCheckMobileScreen();

  useEffect(() => {
    if (id && currentTest.id !== id) {
      dispatch({ type: 'LOAD_TEST_BY_ID', payload: { id } });
    }
  }, [dispatch, id, currentTest.id]);

  const nId = useSelector((state) => state.tests?.currentTest?.id);
  id = id ?? nId;

  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [isSaveModalOpened, setIsSaveModalOpened] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setName(currentTest.name);
    setDescription(currentTest.description);
    setQuestions(currentTest.questions);
    setAnswers(
      currentTest.answers.map((answer) => {
        return { ...answer, isValid: true };
      })
    );
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

  const handleChangeAnswersOrder = useCallback(
    ({ aId, qId, newOrder, oldOrder }) => {
      let newAnswers = JSON.parse(JSON.stringify(answers));
      let changingAnswers = newAnswers.filter(
        (answer) => answer.questionId === qId
      );
      if (newOrder > oldOrder) {
        changingAnswers
          .filter(
            (answer) => answer.order <= newOrder && answer.order >= oldOrder
          )
          .forEach((answer) => {
            answer.order -= 1;
          });
      } else if (newOrder < oldOrder) {
        changingAnswers
          .filter(
            (answer) => answer.order >= newOrder && answer.order <= oldOrder
          )
          .forEach((answer) => {
            answer.order += 1;
          });
      }
      changingAnswers.find((answer) => answer.id === aId).order = newOrder;
      setAnswers(newAnswers);
    },
    [answers, setAnswers]
  );

  const handleAcceptDelete = useCallback(() => {
    enableScroll();
    dispatch({ type: 'DELETE_TEST', payload: { id } });
    navigate(-1);
  }, [dispatch, id, navigate]);

  const handleDeclineDelete = useCallback(() => {
    enableScroll();
    setIsDeleteModalOpened(false);
  }, [setIsDeleteModalOpened]);

  const handleDeleteQuestion = useCallback(
    (id) => {
      setQuestions(questions.filter((question) => question.id !== id));
      setAnswers(answers.filter((answer) => answer.questionId !== id));
    },
    [setQuestions, questions, setAnswers, answers]
  );

  const handleAddAnswer = useCallback(
    ({ qId, aId, isWithoutText = false, order = 0 }) => {
      setAnswers([
        ...answers,
        {
          id: aId,
          name: isWithoutText ? '' : 'Введите ответ',
          questionId: qId,
          order,
          isValid: !isWithoutText,
        },
      ]);
    },
    [setAnswers, answers]
  );

  const handleAddTextQuestion = useCallback(() => {
    const qId = Date.now();
    setAnswers([
      ...answers,
      { id: qId + 1, name: 'Введите ответ', questionId: qId, order: 0 },
      { id: qId + 2, name: 'Введите ответ', questionId: qId, order: 1 },
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
    ({ aId, name, isValid }) => {
      let newAnswers = JSON.parse(JSON.stringify(answers));
      let targetAnswer = newAnswers.find((answer) => answer.id === aId);
      targetAnswer.name = name;
      targetAnswer.isValid = isValid;
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

  const handleSaveChanges = useCallback(() => {
    disableScroll();
    setIsSaveModalOpened(true);
  }, [setIsSaveModalOpened]);

  const handleDeclineSave = useCallback(() => {
    enableScroll();
    setIsSaveModalOpened(false);
  }, [setIsSaveModalOpened]);

  const handleAcceptSave = useCallback(() => {
    enableScroll();
    dispatch({
      type: 'SAVE_TEST_DATA',
      payload: { answers, questions, testId: id, name, description },
    });
    setIsSaveModalOpened(false);
  }, [dispatch, answers, questions, id, name, description]);

  if (currentTest.id !== id) {
    return <></>;
  }

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
      {isSaveModalOpened && (
        <Modal
          title="Сохранить?"
          firstButtonText="Сохранить"
          secondButtonText="Отмена"
          firstButtonClickAction={handleAcceptSave}
          secondButtonClickAction={handleDeclineSave}
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
          edit: styles.inputCenteredPaperField,
          container: styles.nameContainer,
          button: styles.editButton,
        }}
        isEditable
        isMobile={isMobile}
      />
      <CenteredPaper
        id={id}
        defaultValue={description}
        onChange={handleChangeTestDescription}
        className={{
          value: styles.name,
          edit: styles.inputCenteredPaperField,
          container: styles.descriptionContainer,
          button: styles.editButton,
        }}
        isEditable
        isMobile={isMobile}
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
        onChangeAnswersOrder={handleChangeAnswersOrder}
        isMobile={isMobile}
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
        onClick={handleSaveChanges}
        text={
          description
            ? name
              ? 'Сохранить'
              : 'Введите название'
            : 'Введите описание'
        }
        className={classnames(styles.controlButton, styles.saveButton)}
        disabled={
          !name ||
          !description ||
          !answers.reduce((result, answer) => result && answer.isValid, true)
        }
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

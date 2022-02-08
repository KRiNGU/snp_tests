import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './TestPlay.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Question from './Question/Question';
import Button from '@components/Button/Button';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';
import classnames from 'classnames';
import Modal from '@components/Modal/Modal';

const TestPlay = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isFinishModalOpened, setIsFinishModalOpened] = useState(false);
  const [isResultedModalOpened, setIsResultedModalOpened] = useState(false);
  const html = document.documentElement;
  const { body } = document;
  const [result, setResult] = useState(0);
  const navigate = useNavigate();
  const currentTest = useSelector((state) => state.tests.currentTest);
  useEffect(() => {
    if (!currentTest.questions[0]) {
      dispatch({ type: 'LOAD_TEST_BY_ID', payload: { id } });
    }
  }, [dispatch, id, currentTest.questions]);
  const questions = useMemo(() => currentTest.questions ?? [], [currentTest]);
  const answers = useMemo(() => currentTest.answers ?? [], [currentTest]);
  let userAnswers = useRef({});
  useEffect(
    () =>
      questions.forEach((question) => {
        userAnswers.current = {
          ...userAnswers.current,
          [question.id]: null,
        };
      }),
    [questions]
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswersChange = useCallback((questionId, newAnswer) => {
    userAnswers.current[questionId] = newAnswer;
  }, []);

  const handlePreviousQuestion = useCallback(() => {
    setCurrentQuestion(currentQuestion - 1);
  }, [setCurrentQuestion, currentQuestion]);

  const handleNextQuestion = useCallback(() => {
    setCurrentQuestion(currentQuestion + 1);
  }, [setCurrentQuestion, currentQuestion]);

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

  const handleFinishTest = useCallback(() => {
    disableScroll();
    setIsFinishModalOpened(true);
  }, [setIsFinishModalOpened, disableScroll]);

  const handleAcceptFinish = useCallback(() => {
    let result = 0;
    let max = 0;
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const qId = question.id;
      const rightAnswerId = question.rightAnswerId;
      if (typeof rightAnswerId === 'number') {
        max++;
        if (
          userAnswers.current?.[qId] ===
          answers.find((answer) => answer.id === rightAnswerId)?.name
        ) {
          result++;
        }
      } else {
        for (let j = 0; j < question.rightAnswerId.length; j++) {
          const answer = question.rightAnswerId[j];
          if (userAnswers.current?.[qId]?.includes(answer)) {
            result++;
          }
        }
        max += question.rightAnswerId.length;
      }
    }
    setResult(`${result}/${max}`);
    setIsFinishModalOpened(false);
    setIsResultedModalOpened(true);
  }, [
    answers,
    questions,
    setResult,
    setIsFinishModalOpened,
    setIsResultedModalOpened,
  ]);

  const handleDeclineFinish = useCallback(() => {
    enableScroll();
    setIsFinishModalOpened(false);
  }, [setIsFinishModalOpened, enableScroll]);

  const handleRestart = useCallback(() => {
    setCurrentQuestion(0);
    enableScroll();
    setIsResultedModalOpened(false);
  }, [setCurrentQuestion, enableScroll, setIsResultedModalOpened]);

  const handleExit = useCallback(() => {
    enableScroll();
    navigate(-1);
  }, [navigate, enableScroll]);

  if (!questions[0]) {
    return <div></div>;
  }

  return (
    <div className={styles.container}>
      {isFinishModalOpened && (
        <Modal
          title="Закончить тест?"
          firstButtonText="Закончить"
          secondButtonText="Вернуться"
          firstButtonClickAction={handleAcceptFinish}
          secondButtonClickAction={handleDeclineFinish}
        />
      )}
      {isResultedModalOpened && (
        <Modal
          title={`Итоговый результат: ${result}`}
          firstButtonText="Перепройти тест"
          secondButtonText="Выйти"
          firstButtonClickAction={handleRestart}
          secondButtonClickAction={handleExit}
        />
      )}
      <h1 className={styles.title}>Вопрос {currentQuestion + 1}</h1>
      {questions.map((question, index) => (
        <Question
          key={question.id}
          question={question}
          onChange={(newAnswer) => handleAnswersChange(question?.id, newAnswer)}
          visible={currentQuestion === index}
          defaultValue={userAnswers.current[question?.id]}
        />
      ))}
      <Button
        text="Завершить прохождение теста"
        className={styles.endButton}
        onClick={handleFinishTest}
      />
      {currentQuestion !== 0 && (
        <Button
          text={<ImArrowLeft />}
          onClick={handlePreviousQuestion}
          className={classnames(styles.leftButton, styles.arrowButton)}
        />
      )}
      {currentQuestion !== questions.length - 1 && (
        <Button
          text={<ImArrowRight />}
          onClick={handleNextQuestion}
          className={classnames(styles.rightButton, styles.arrowButton)}
        />
      )}
    </div>
  );
};

export default memo(TestPlay);

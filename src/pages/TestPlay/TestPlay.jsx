import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './TestPlay.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Question from './Question/Question';
import Button from '@components/Button/Button';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';
import classnames from 'classnames';
import Modal from '@components/Modal/Modal';
import { disableScroll, enableScroll } from '@utils/utils';
import { useCheckMobileScreen } from '@utils/hooks';
import { RiStopCircleLine } from 'react-icons/ri';

const TestPlay = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isFinishModalOpened, setIsFinishModalOpened] = useState(false);
  const [isResultedModalOpened, setIsResultedModalOpened] = useState(false);
  const [result, setResult] = useState(0);
  const navigate = useNavigate();
  const currentTest = useSelector((state) => state.tests.currentTest);
  const isMobile = useCheckMobileScreen();
  useEffect(() => {
    if (currentTest.id !== id) {
      dispatch({ type: 'LOAD_TEST_BY_ID', payload: { id } });
    }
  }, [dispatch, id, currentTest.id]);
  const questions = useMemo(() => currentTest.questions ?? [], [currentTest]);
  const answers = useMemo(() => currentTest.answers ?? [], [currentTest]);
  let userAnswers = useRef({});
  useEffect(
    () =>
      questions.forEach((question) => {
        userAnswers.current = {
          ...userAnswers.current,
          [question.id]: question.type === 0 ? '' : null,
        };
      }),
    [questions]
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isMoveAvailable, setIsMoveAvailable] = useState(false);

  const handleAnswersChange = useCallback(
    (questionId, newAnswer) => {
      userAnswers.current[questionId] = newAnswer;
      setIsMoveAvailable(
        userAnswers.current[questions[currentQuestion]?.id] !== ''
      );
    },
    [questions, currentQuestion, setIsMoveAvailable]
  );

  const handlePreviousQuestion = useCallback(() => {
    setCurrentQuestion(currentQuestion - 1);
  }, [setCurrentQuestion, currentQuestion]);

  const handleNextQuestion = useCallback(() => {
    setCurrentQuestion(currentQuestion + 1);
  }, [setCurrentQuestion, currentQuestion]);

  const handleFinishTest = useCallback(() => {
    disableScroll();
    setIsFinishModalOpened(true);
  }, [setIsFinishModalOpened]);

  const handleAcceptFinish = useCallback(() => {
    let result = 0;
    let max = questions.length;
    const userAnswersState = userAnswers.current;
    for (const questionId in userAnswersState) {
      const currentAnswer = userAnswersState[questionId];
      if (typeof currentAnswer === 'number') {
        const rightAnswer = answers.find(
          (answer) => answer.questionId === parseInt(questionId)
        ).name;
        if (rightAnswer === currentAnswer) {
          result++;
        }
      } else if (currentAnswer) {
        const rightAnswer = questions.find(
          (question) => question.id === parseInt(questionId)
        ).rightAnswerId;
        if (JSON.stringify(rightAnswer) === JSON.stringify(currentAnswer)) {
          result++;
        }
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
  }, [setIsFinishModalOpened]);

  const handleRestart = useCallback(() => {
    setCurrentQuestion(0);
    enableScroll();
    setIsResultedModalOpened(false);
  }, [setCurrentQuestion, setIsResultedModalOpened]);

  const handleExit = useCallback(() => {
    enableScroll();
    navigate(-1);
  }, [navigate]);

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
          type={question.type}
        />
      ))}
      {currentQuestion !== 0 && (
        <Button
          text={<ImArrowLeft />}
          onClick={handlePreviousQuestion}
          className={classnames(styles.leftButton, styles.arrowButton)}
          disabled={!isMoveAvailable}
        />
      )}
      <Button
        text={
          isMobile ? (
            <RiStopCircleLine size="20" />
          ) : (
            'Завершить прохождение теста'
          )
        }
        className={styles.endButton}
        onClick={handleFinishTest}
        disabled={!isMoveAvailable}
      />
      {currentQuestion !== questions.length - 1 && (
        <Button
          text={<ImArrowRight />}
          onClick={handleNextQuestion}
          className={classnames(styles.rightButton, styles.arrowButton)}
          disabled={!isMoveAvailable}
        />
      )}
    </div>
  );
};

export default memo(TestPlay);

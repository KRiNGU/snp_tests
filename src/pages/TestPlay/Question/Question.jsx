import Input from '@components/Input/Input';
import MultipleAnswer from '@components/MultipleAnswer/MultipleAnswer';
import SingleAnswer from '@components/SingleAnswer/SingleAnswer';
import { sortByParameter } from '@utils/utils';
import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Question.module.css';

const Question = ({ question, onChange, visible = false, defaultValue }) => {
  const [answer, setAnswer] = useState(null);
  const answers = useSelector((state) =>
    state.tests.currentTest.answers.filter(
      (answer) => answer.questionId === question?.id
    )
  );
  const rightAnswerId = question?.rightAnswerId;

  const handleNumberChange = useCallback(
    ({ value }) => {
      setAnswer(value);
      onChange(value);
    },
    [setAnswer, onChange]
  );

  const handleSingleChange = useCallback(
    (id) => {
      setAnswer(id === answer?.[0] ? null : [id]);
      onChange(id === answer?.[0] ? null : [id]);
    },
    [setAnswer, onChange, answer]
  );

  const handleMultipleChange = useCallback(
    (id) => {
      switch (answer) {
        case null:
          setAnswer([id]);
          onChange([id]);
          break;
        case [id]:
          setAnswer(null);
          onChange(null);
          break;
        default:
          answer?.includes(id)
            ? setAnswer(answer.filter((aId) => aId !== id))
            : setAnswer([...answer, id]);
          onChange(
            answer?.includes(id)
              ? answer.filter((aId) => aId !== id)
              : [...answer, id]
          );
          break;
      }
    },
    [answer, setAnswer, onChange]
  );

  return (
    visible && (
      <div className={styles.container}>
        <h3 className={styles.questionName}>{question.name}</h3>
        {typeof rightAnswerId === 'number' ? (
          <Input
            inputLabel={styles.numberInputLabel}
            placeholder="Ответ"
            onChange={handleNumberChange}
            input={styles.numberInput}
            value={answer ?? ''}
            container={styles.numberContainer}
          />
        ) : rightAnswerId?.length === 1 ? (
          <SingleAnswer
            answers={sortByParameter(answers, 'order')}
            currentAnswer={answer ?? []}
            onChange={handleSingleChange}
          />
        ) : (
          <MultipleAnswer
            answers={sortByParameter(answers, 'order')}
            currentAnswer={answer ?? []}
            onChange={handleMultipleChange}
          />
        )}
      </div>
    )
  );
};

export default memo(Question);

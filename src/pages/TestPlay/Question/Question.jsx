import Input from '@components/Input/Input';
import MultipleAnswer from '@components/MultipleAnswer/MultipleAnswer';
import SingleAnswer from '@components/SingleAnswer/SingleAnswer';
import { sortByParameter } from '@utils/utils';
import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Question.module.css';
import PropTypes from 'prop-types';

const Question = ({ question, onChange, visible = false, type }) => {
  const [answer, setAnswer] = useState(type === 0 ? 0 : null);
  const answers = useSelector((state) =>
    state.tests.currentTest.answers.filter(
      (answer) => answer.questionId === question?.id
    )
  );

  const handleNumberChange = useCallback(
    ({ value }) => {
      setAnswer(value ? parseInt(value) : 0);
      onChange(value ? parseInt(value) : 0);
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
        {type === 0 ? (
          <Input
            inputLabel={styles.numberInputLabel}
            placeholder="Ответ"
            onChange={handleNumberChange}
            input={styles.numberInput}
            value={answer ?? ''}
            container={styles.numberContainer}
          />
        ) : type === 1 ? (
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

Question.propTypes = {
  question: PropTypes.object,
  onChange: PropTypes.func,
  visible: PropTypes.bool,
  type: PropTypes.number,
};

export default memo(Question);

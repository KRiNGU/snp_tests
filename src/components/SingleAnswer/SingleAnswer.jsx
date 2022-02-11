import Checkbox from '@components/Checkbox/Checkbox';
import { memo } from 'react';
import styles from './SingleAnswer.module.css';

const SingleAnswer = ({
  answers = [],
  currentAnswer = [],
  onChange = () => {},
}) => {
  return (
    <>
      {answers.map((answer) => {
        return (
          <Checkbox
            key={answer.id}
            text={answer.name}
            onChange={() => onChange(answer.id)}
            checked={answer.id === currentAnswer[0]}
            className={{
              container: styles.checkboxContainer,
              checkmark: styles.checkboxCheckmark,
            }}
            isCircle
          />
        );
      })}
    </>
  );
};

export default memo(SingleAnswer);

import Checkbox from '@components/Checkbox/Checkbox';
import { memo } from 'react';
import styles from './SingleAnswer.module.css';

const SingleAnswer = ({
  answers = [],
  question = '',
  currentAnswer = [],
  onChange = () => {},
}) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.question}>{question}</h3>
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
    </div>
  );
};

export default memo(SingleAnswer);

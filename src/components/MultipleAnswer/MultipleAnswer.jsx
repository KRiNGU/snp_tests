import Checkbox from '@components/Checkbox/Checkbox';
import { memo } from 'react';
import styles from './MultipleAnswer.module.css';

const MultipleAnswer = ({
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
            checked={currentAnswer?.includes(answer.id)}
            className={{
              container: styles.checkboxContainer,
              checkmark: styles.checkboxCheckmark,
            }}
          />
        );
      })}
    </div>
  );
};

export default memo(MultipleAnswer);

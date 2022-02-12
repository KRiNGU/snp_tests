import Checkbox from '@components/Checkbox/Checkbox';
import { memo } from 'react';
import styles from './MultipleAnswer.module.css';

const MultipleAnswer = ({
  answers = [],
  currentAnswer = [],
  onChange = () => {},
}) => (
  <>
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
  </>
);

export default memo(MultipleAnswer);

import Checkbox from '@components/Checkbox/Checkbox';
import { memo } from 'react';
import styles from './MultipleAnswer.module.css';
import PropTypes from 'prop-types';

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

MultipleAnswer.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.object),
  currentAnswer: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
};

export default memo(MultipleAnswer);

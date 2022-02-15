import Checkbox from '@components/Checkbox/Checkbox';
import { memo } from 'react';
import styles from './SingleAnswer.module.css';
import PropTypes from 'prop-types';

const SingleAnswer = ({
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

SingleAnswer.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.object),
  currentAnswer: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
};

export default memo(SingleAnswer);

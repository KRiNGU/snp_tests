import { memo } from 'react';
import styles from './Button.module.css';
import classnames from 'classnames';

const Button = ({ disabled = false, onClick, className, text }) => {
  return (
    <button
      className={classnames(styles.button, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default memo(Button);

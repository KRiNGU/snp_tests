import { memo } from 'react';
import styles from './SecondaryButton.module.css';
import classnames from 'classnames';

const SecondaryButton = ({ disabled = false, onClick, className, text }) => (
  <button
    className={classnames(styles.button, className)}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default memo(SecondaryButton);

import styles from './Checkbox.module.css';
import classnames from 'classnames';
import { memo } from 'react';

const Checkbox = ({
  disabled = false,
  onClick,
  text,
  checkboxContainer = '',
  checkboxCheckmark = '',
}) => {
  return (
    <label className={classnames(checkboxContainer, styles.container)}>
      {text}
      <input type="checkbox" onClick={onClick} disabled={disabled} />
      <span className={classnames(checkboxCheckmark, styles.checkmark)}></span>
    </label>
  );
};

export default memo(Checkbox);

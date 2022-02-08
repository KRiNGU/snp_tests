import styles from './Checkbox.module.css';
import classnames from 'classnames';
import { memo } from 'react';

const Checkbox = ({
  checked = false,
  onChange,
  text,
  className = {},
  isCircle = false,
}) => {
  return (
    <label className={classnames(className.container, styles.container)}>
      {text}
      <input type="checkbox" onChange={() => onChange()} checked={checked} />
      <span
        className={classnames(
          className.checkmark,
          styles.checkmark,
          isCircle ? styles.circleCheckmark : ''
        )}
      ></span>
    </label>
  );
};

export default memo(Checkbox);

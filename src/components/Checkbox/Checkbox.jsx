import styles from './Checkbox.module.css';
import classnames from 'classnames';
import { memo } from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({
  checked = false,
  onChange,
  text,
  className = {},
  isCircle = false,
}) => (
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

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  text: PropTypes.string,
  className: PropTypes.object,
  isCircle: PropTypes.bool,
};

export default memo(Checkbox);

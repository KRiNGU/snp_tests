import { memo } from 'react';
import styles from './Button.module.css';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({
  disabled = false,
  onClick = () => {},
  className = {},
  text = '',
}) => (
  <button
    className={classnames(styles.button, className)}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]),
};

export default memo(Button);

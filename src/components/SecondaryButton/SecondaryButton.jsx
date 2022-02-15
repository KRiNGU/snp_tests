import { memo } from 'react';
import styles from './SecondaryButton.module.css';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SecondaryButton = ({ disabled = false, onClick, className, text }) => (
  <button
    className={classnames(styles.button, className)}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

SecondaryButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  text: PropTypes.string,
};

export default memo(SecondaryButton);

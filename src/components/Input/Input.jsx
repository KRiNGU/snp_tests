import { memo } from 'react';
import classnames from 'classnames';
import styles from './Input.module.css';

const Input = ({
  disabled = false,
  inputText,
  onChange,
  placeholder,
  inputLabel,
  input,
  errorLabel,
  value,
  error,
  errorMessage,
}) => (
  <>
    <label className={classnames(styles.inputText, inputLabel)}>
      {inputText}
    </label>
    <input
      type="text"
      value={value}
      className={classnames(styles.input, input)}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
    />
    {error !== 0 && (
      <label className={classnames(styles.errorLabel, errorLabel)}>
        {errorMessage}
      </label>
    )}
  </>
);

export default memo(Input);

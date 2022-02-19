import { memo, useCallback, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import styles from './Input.module.css';
import Button from '@components/Button/Button';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import PropTypes from 'prop-types';

const Input = ({
  id,
  disabled = false,
  inputText = '',
  onChange = () => {},
  placeholder,
  inputLabel,
  input,
  errorLabel,
  error = '',
  value = '',
  onKeyDown = () => {},
  giveFocus = false,
  isChangeable = false,
  container,
  onDelete,
  onEditInputName,
  onBlur = () => {},
  type = 'text',
}) => {
  const [name, setName] = useState(inputText);
  const [isEditMode, setIsEditMode] = useState(false);
  const ref = useRef();

  const handleChange = useCallback(
    (e) => {
      onChange({ id, value: e.target.value });
    },
    [onChange, id]
  );

  const toggleEditMode = useCallback(
    (e) => {
      e.stopPropagation();
      setIsEditMode(!isEditMode);
    },
    [setIsEditMode, isEditMode]
  );

  const handleChangeName = useCallback(
    (e) => {
      setName(e.target.value);
      onEditInputName({ value: e.target.value });
    },
    [setName, onEditInputName]
  );

  const onNameKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        setIsEditMode(false);
        if (!e.target.value) {
          onDelete(id);
        }
      }
    },
    [setIsEditMode, onDelete, id]
  );

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [onDelete, id]);

  useEffect(() => {
    if (giveFocus) {
      ref.current.focus();
    }
  }, [giveFocus]);

  const handleBlurName = useCallback(() => {
    setIsEditMode(false);
  }, [setIsEditMode]);

  return (
    <div className={classnames(styles.container, container)}>
      {!isEditMode ? (
        <label className={classnames(styles.inputText, inputLabel)}>
          {`${name} ${name ? ':' : ''}`}
        </label>
      ) : (
        <input
          value={name}
          className={classnames(styles.inputName)}
          placeholder="Введите в поле"
          onChange={handleChangeName}
          onKeyDown={onNameKeyDown}
          onBlur={handleBlurName}
        />
      )}
      <div className={styles.inputContainer}>
        <input
          type={type}
          value={value}
          className={classnames(styles.input, input)}
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          ref={ref}
        />
        {isChangeable && (
          <>
            <Button
              className={classnames(styles.button, styles.edit)}
              onClick={toggleEditMode}
              text={<AiOutlineEdit className={styles.editIcon} />}
            />
            <Button
              className={classnames(styles.button, styles.delete)}
              onClick={handleDelete}
              text={<MdOutlineDeleteOutline className={styles.deleteIcon} />}
            />
          </>
        )}
      </div>

      {error !== 0 && (
        <label className={classnames(styles.errorLabel, errorLabel)}>
          {error}
        </label>
      )}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.number,
  disabled: PropTypes.bool,
  inputText: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  inputLabel: PropTypes.string,
  input: PropTypes.string,
  errorLabel: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  validator: PropTypes.func,
  onKeyDown: PropTypes.func,
  giveFocus: PropTypes.bool,
  isChangeable: PropTypes.bool,
  container: PropTypes.string,
  onDelete: PropTypes.func,
  onEditInputName: PropTypes.func,
  onBlur: PropTypes.func,
};

export default memo(Input);

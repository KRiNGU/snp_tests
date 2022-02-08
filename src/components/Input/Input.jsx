import { memo, useCallback, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import styles from './Input.module.css';
import Button from '@components/Button/Button';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDeleteOutline } from 'react-icons/md';

const Input = ({
  id,
  disabled = false,
  inputText = '',
  onChange = () => {},
  placeholder,
  inputLabel,
  input,
  errorLabel,
  value = '',
  validator = () => {},
  onKeyDown = () => {},
  giveFocus = false,
  isChangeable = false,
  container,
  onDelete,
  onEditInputName,
}) => {
  const [error, setError] = useState(0);
  const [name, setName] = useState(inputText);
  const [isEditMode, setIsEditMode] = useState(false);
  const ref = useRef();

  const handleChange = useCallback(
    (e) => {
      setError(validator(e.target.value));
      onChange({ id, value: e.target.value });
    },
    [setError, validator, onChange, id]
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
      }
    },
    [setIsEditMode]
  );

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [onDelete, id]);

  useEffect(() => {
    if (giveFocus) {
      ref.current.focus();
    }
  }, [giveFocus]);

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
        />
      )}
      <input
        type="text"
        value={value}
        className={classnames(styles.input, input)}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        ref={ref}
      />

      {error !== 0 && (
        <label className={classnames(styles.errorLabel, errorLabel)}>
          {error}
        </label>
      )}
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
  );
};
export default memo(Input);

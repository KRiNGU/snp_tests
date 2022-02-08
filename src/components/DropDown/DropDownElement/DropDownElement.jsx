import { memo, useCallback, useState } from 'react';
import styles from './DropDownElement.module.css';
import { BsCheck } from 'react-icons/bs';
import cs from 'classnames';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';

const DropDownElement = ({
  id,
  defaultText,
  onClick,
  classNames = {},
  isSelected = false,
  onChange,
  onDelete,
  isChangeable = false,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [text, setText] = useState(defaultText);

  const handleClick = useCallback(() => {
    onClick(id);
  }, [onClick, id]);

  const toggleEditMode = useCallback(
    (e) => {
      e.stopPropagation();
      setIsEditMode(true);
    },
    [setIsEditMode]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        setIsEditMode(false);
      }
    },
    [setIsEditMode]
  );

  const handleChangeElement = useCallback(
    ({ value }) => {
      setText(value);
      onChange({ id, value });
    },
    [onChange, id, setText]
  );

  const handleDelete = useCallback(
    (e) => {
      e.stopPropagation();
      onDelete(id);
    },
    [onDelete, id]
  );

  return !isEditMode ? (
    <div onClick={handleClick} className={cs(classNames.item, styles.item)}>
      <span className={styles.text}>{text}</span>{' '}
      {isSelected && <BsCheck className={styles.rightAnswer} />}
      {isChangeable && (
        <>
          <Button
            className={styles.editButton}
            onClick={toggleEditMode}
            text={<AiOutlineEdit className={styles.editIcon} />}
          />
          <Button
            className={styles.deleteButton}
            onClick={handleDelete}
            text={<MdOutlineDeleteOutline className={styles.deleteIcon} />}
          />
        </>
      )}
    </div>
  ) : (
    <div className={cs(classNames.item, styles.inputItem)}>
      <Input
        value={text}
        onChange={handleChangeElement}
        onKeyDown={handleKeyDown}
        input={styles.input}
        giveFocus
      />
    </div>
  );
};

export default memo(DropDownElement);

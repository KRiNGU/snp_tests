import { memo, useCallback, useState } from 'react';
import styles from './DropDownElement.module.css';
import { BsCheck } from 'react-icons/bs';
import cs from 'classnames';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { Draggable } from 'react-beautiful-dnd';

const DropDownElement = ({
  index,
  id,
  defaultText,
  onClick,
  classNames = {},
  isSelected = false,
  onChange,
  onDelete,
  isChangeable = false,
  isMobile = false,
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

  const handleDelete = useCallback(
    (e) => {
      e.stopPropagation();
      onDelete(id);
    },
    [onDelete, id]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        setIsEditMode(false);
        if (!e.target.value) {
          handleDelete(e);
        }
      }
    },
    [setIsEditMode, handleDelete]
  );

  const handleChangeElement = useCallback(
    ({ value }) => {
      setText(value);
      onChange({ id, value });
    },
    [onChange, id, setText]
  );

  const handleBlur = useCallback(() => {
    setIsEditMode(false);
  }, [setIsEditMode]);

  return !isEditMode ? (
    <Draggable key={id} draggableId={id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={handleClick}
          className={cs(classNames.item, styles.item)}
        >
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
      )}
    </Draggable>
  ) : (
    <div className={cs(classNames.item, styles.inputItem)}>
      <Input
        value={text}
        onChange={handleChangeElement}
        onKeyDown={handleKeyDown}
        input={styles.input}
        onBlur={isMobile ? handleBlur : () => {}}
        giveFocus
      />
    </div>
  );
};

export default memo(DropDownElement);

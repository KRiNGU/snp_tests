import { memo, useCallback, useState } from 'react';
import styles from './DropDown.module.css';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import DropDownElement from './DropDownElement/DropDownElement';
import cs from 'classnames';
import Button from '@components/Button/Button';
import { AiOutlineEdit } from 'react-icons/ai';
import Input from '@components/Input/Input';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdOutlineDeleteOutline } from 'react-icons/md';

const DropDown = ({
  className = {},
  list,
  title,
  dropDownId,
  isChangeable = false,
  onSelect = () => {},
  onDelete = () => {},
  onChangeElement = () => {},
  defaultSelected = [],
  onAddElement = () => {},
  onDeleteElement = () => {},
  onEditName = () => {},
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [headerTitle, setTitle] = useState(title);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selected, setSelected] = useState(defaultSelected);

  const toggleOpened = useCallback(() => {
    if (isEditMode) {
      return;
    }
    setIsOpened(!isOpened);
  }, [setIsOpened, isOpened, isEditMode]);

  const selectItem = useCallback(
    (id) => {
      let newSelected = selected;
      for (let i = 0; i < newSelected.length; i++) {
        if (id === newSelected[i]) {
          newSelected = newSelected.filter((item) => item !== id);
          setSelected(newSelected);
          onSelect({ newSelected, dropDownId });
          return;
        }
      }
      newSelected = [...newSelected, id];
      setSelected(newSelected);
      onSelect({ newSelected, dropDownId });
    },
    [onSelect, dropDownId, selected, setSelected]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        setIsEditMode(false);
      }
    },
    [setIsEditMode]
  );

  const handleChangeHeaderTitle = useCallback(
    ({ id, value }) => {
      setTitle(value);
      onEditName({ id, value });
    },
    [setTitle, onEditName]
  );

  const toggleEditMode = useCallback(
    (e) => {
      e.stopPropagation();
      setIsEditMode(!isEditMode);
    },
    [isEditMode, setIsEditMode]
  );

  const toggleAddElement = useCallback(
    (e) => {
      e.stopPropagation();
      onAddElement(dropDownId);
    },
    [dropDownId, onAddElement]
  );

  const handleDeleteDropDown = useCallback(() => {
    onDelete(dropDownId);
  }, [onDelete, dropDownId]);

  const handleDeleteElement = useCallback(
    (dropDownElementId) => {
      onDeleteElement(dropDownElementId);
    },
    [onDeleteElement]
  );

  const handleChangeElement = useCallback(
    ({ id, value }) => {
      onChangeElement({ dropDownElementId: id, value });
    },
    [onChangeElement]
  );

  return (
    <div className={cs(className.container, styles.container)}>
      <div
        className={cs(className.header, styles.header)}
        onClick={toggleOpened}
      >
        {!isEditMode && (
          <div className={cs(className.title, styles.title)}>{headerTitle}</div>
        )}
        {!isEditMode &&
          (isOpened ? (
            <FaAngleUp className={styles.angle} />
          ) : (
            <FaAngleDown className={styles.angle} />
          ))}
        {isEditMode && (
          <Input
            id={dropDownId}
            value={headerTitle}
            onChange={handleChangeHeaderTitle}
            onKeyDown={handleKeyDown}
            input={styles.headerTitleInput}
            giveFocus
          />
        )}
        {isChangeable && (
          <>
            <Button
              className={styles.changeNameButton}
              onClick={toggleEditMode}
              text={<AiOutlineEdit className={styles.changeQuestionName} />}
            />
            {!isEditMode && (
              <Button
                className={styles.addElement}
                onClick={toggleAddElement}
                text={
                  <IoIosAddCircleOutline className={styles.addElementIcon} />
                }
              />
            )}
          </>
        )}
        {isChangeable && (
          <Button
            className={styles.delete}
            onClick={handleDeleteDropDown}
            text={<MdOutlineDeleteOutline className={styles.deleteIcon} />}
          />
        )}
      </div>
      {isOpened && (
        <div role="list" className={cs(className.list, styles.list)}>
          {list.map((item) => (
            <DropDownElement
              key={item.id}
              id={item.id}
              defaultText={item.name}
              onClick={selectItem}
              classNames={className.item}
              onChange={handleChangeElement}
              isSelected={selected.includes(item.id)}
              onDelete={handleDeleteElement}
              isChangeable={isChangeable}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(DropDown);

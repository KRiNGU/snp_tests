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
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import classnames from 'classnames';
import PropTypes from 'prop-types';

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
  onDragEnd = () => {},
  isMobile = false,
  isSingleSelect = false,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [headerTitle, setTitle] = useState(title);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selected, setSelected] = useState(defaultSelected);

  const handleBlur = useCallback(() => {
    setIsEditMode(false);
  }, [setIsEditMode]);

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
        if (isSingleSelect) {
          newSelected = [id];
          setSelected(newSelected);
          onSelect({ newSelected, dropDownId });
          return;
        }
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
    [onSelect, dropDownId, selected, setSelected, isSingleSelect]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        setIsEditMode(false);
        if (!e.target.value) {
          onDelete(dropDownId);
        }
      }
    },
    [setIsEditMode, onDelete, dropDownId]
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
      onAddElement({ qId: dropDownId, order: list.length - 1 });
    },
    [dropDownId, onAddElement, list.length]
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

  const handleDragEnd = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }
      onDragEnd({
        aId: parseInt(result.draggableId),
        newOrder: result.destination.index,
        oldOrder: result.source.index,
        qId: dropDownId,
      });
    },
    [onDragEnd, dropDownId]
  );

  return (
    <div className={cs(className.container, styles.container)}>
      <div
        className={cs(
          className.header,
          styles.header,
          isEditMode && styles.headerOnEdit
        )}
        onClick={toggleOpened}
      >
        {!isEditMode && (
          <span className={cs(className.title, styles.title)}>
            {headerTitle}
          </span>
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
            onBlur={isMobile ? handleBlur : () => {}}
            giveFocus
          />
        )}
        {isChangeable && (
          <>
            <Button
              className={classnames(styles.button, styles.delete)}
              onClick={handleDeleteDropDown}
              text={<MdOutlineDeleteOutline className={styles.deleteIcon} />}
            />
            <Button
              className={classnames(styles.button, styles.changeNameButton)}
              onClick={toggleEditMode}
              text={<AiOutlineEdit className={styles.changeQuestionName} />}
            />
            {!isEditMode && (
              <Button
                className={classnames(styles.button, styles.addElement)}
                onClick={toggleAddElement}
                text={
                  <IoIosAddCircleOutline className={styles.addElementIcon} />
                }
              />
            )}
          </>
        )}
      </div>
      {isOpened && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div role="list" className={cs(className.list, styles.list)}>
            <Droppable droppableId={dropDownId.toString()} key={dropDownId}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {list.map((item, index) => (
                    <DropDownElement
                      index={index}
                      key={item.id}
                      id={item.id}
                      defaultText={item.name}
                      onClick={selectItem}
                      classNames={className.item}
                      onChange={handleChangeElement}
                      isSelected={selected.includes(item.id)}
                      onDelete={handleDeleteElement}
                      isChangeable={isChangeable}
                      isMobile={isMobile}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

DropDown.propTypes = {
  className: PropTypes.object,
  list: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  dropDownId: PropTypes.number,
  isChangeable: PropTypes.bool,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
  onChangeElement: PropTypes.func,
  defaultSelected: PropTypes.arrayOf(PropTypes.number),
  onAddElement: PropTypes.func,
  onDeleteElement: PropTypes.func,
  onEditName: PropTypes.func,
  onDragEnd: PropTypes.func,
  isMobile: PropTypes.bool,
  isSingleSelect: PropTypes.bool,
};

export default memo(DropDown);

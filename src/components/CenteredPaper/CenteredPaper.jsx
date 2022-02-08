import { memo, useCallback, useEffect, useState } from 'react';
import styles from './CenteredPaper.module.css';
import classnames from 'classnames';
import Input from '@components/Input/Input';
import Button from '@components/Button/Button';
import { AiOutlineEdit } from 'react-icons/ai';

const CenteredPaper = ({
  defaultValue,
  className = {},
  isEditable = false,
  onChange = () => {},
  payload = '',
}) => {
  const [value, setValue] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue, setValue]);

  const handleChange = useCallback(
    ({ value }) => {
      setValue(value);
      onChange({ value });
    },
    [onChange, setValue]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (!value) {
        return;
      }
      if (e.key === 'Enter') {
        setIsEditMode(false);
      }
    },
    [setIsEditMode, value]
  );

  const toggleEditMode = useCallback(
    (e) => {
      if (!value) {
        setIsEditMode(true);
        return;
      }
      setIsEditMode(!isEditMode);
    },
    [setIsEditMode, isEditMode, value]
  );

  return (
    <div className={classnames(className.container, styles.container)}>
      {!isEditMode ? (
        <div
          className={classnames(
            className.valueContainer,
            styles.valueContainer
          )}
        >
          <span className={classnames(className.value, styles.value)}>
            {value}
          </span>
        </div>
      ) : (
        <Input
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          payload={payload}
          input={classnames(styles.edit, className.edit)}
          giveFocus
        />
      )}
      {isEditable && (
        <Button
          text={<AiOutlineEdit />}
          className={classnames(styles.button, className.button)}
          onClick={toggleEditMode}
        />
      )}
    </div>
  );
};

export default memo(CenteredPaper);

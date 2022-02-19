import Button from '@components/Button/Button';
import classnames from 'classnames';
import { useEffect } from 'react';
import { memo, useCallback, useRef } from 'react';
import styles from './Modal.module.css';
import { RiCloseFill } from 'react-icons/ri';
import PropTypes from 'prop-types';

const Modal = ({
  title,
  submitButtonText,
  exitButtonText = null,
  onSubmitButtonClick = () => {},
  onExitButtonClick = () => {},
}) => {
  const ref = useRef();
  useEffect(() => {
    ref.current.focus();
  });

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onExitButtonClick();
      }
    },
    [onExitButtonClick]
  );

  const handleClick = useCallback(
    (e) => {
      if (e.currentTarget === e.target) {
        onExitButtonClick();
      }
    },
    [onExitButtonClick]
  );

  return (
    <div
      className={styles.container}
      onKeyDown={handleKeyDown}
      tabIndex={1}
      ref={ref}
      onClick={handleClick}
    >
      <div className={styles.content}>
        <Button
          className={styles.closeButton}
          text={<RiCloseFill size={20} className={styles.closeButtonIcon} />}
          onClick={onExitButtonClick}
        />
        <h2 className={styles.header}>{title}</h2>
        <div className={styles.buttons}>
          <Button
            className={classnames(styles.button, styles.firstButton)}
            text={submitButtonText}
            onClick={onSubmitButtonClick}
          />
          {exitButtonText && (
            <Button
              className={classnames(styles.button, styles.secondButton)}
              text={exitButtonText}
              onClick={onExitButtonClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  firstButtonText: PropTypes.string,
  secondButtonText: PropTypes.string,
  firstButtonClickAction: PropTypes.func,
  secondButtonClickAction: PropTypes.func,
  onClose: PropTypes.func,
};

export default memo(Modal);

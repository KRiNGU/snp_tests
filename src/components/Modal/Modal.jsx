import Button from '@components/Button/Button';
import classnames from 'classnames';
import { useEffect } from 'react';
import { memo, useCallback, useRef } from 'react';
import styles from './Modal.module.css';
import { RiCloseFill } from 'react-icons/ri';
import PropTypes from 'prop-types';

const Modal = ({
  title,
  firstButtonText,
  secondButtonText = null,
  firstButtonClickAction = () => {},
  secondButtonClickAction = () => {},
  onClose = secondButtonClickAction,
}) => {
  const ref = useRef();
  useEffect(() => {
    ref.current.focus();
  });

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const handleClick = useCallback(
    (e) => {
      if (e.currentTarget === e.target) {
        onClose();
      }
    },
    [onClose]
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
          onClick={onClose}
        />
        <h2 className={styles.header}>{title}</h2>
        <Button
          className={classnames(styles.button, styles.firstButton)}
          text={firstButtonText}
          onClick={firstButtonClickAction}
        />
        {secondButtonText && (
          <Button
            className={classnames(styles.button, styles.secondButton)}
            text={secondButtonText}
            onClick={secondButtonClickAction}
          />
        )}
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

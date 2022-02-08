import Button from '@components/Button/Button';
import classnames from 'classnames';
import { memo } from 'react';
import styles from './Modal.module.css';

const Modal = ({
  title,
  firstButtonText,
  secondButtonText = null,
  firstButtonClickAction = () => {},
  secondButtonClickAction = () => {},
  onKeyDown = () => {},
}) => {
  return (
    <div className={styles.container} onKeyDown={onKeyDown}>
      <div className={styles.content}>
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

export default memo(Modal);

import classnames from 'classnames';
import { memo, useCallback } from 'react';
import styles from './ListElement.module.css';
import { AiOutlineEdit } from 'react-icons/ai';
import { VscDebugStart } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ListElement = ({ additionalStyles, id, name, description, date }) => {
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const navigate = useNavigate();
  const handlePlayClick = useCallback(() => {
    navigate(`/play/${id}`);
  }, [navigate, id]);
  const handleEditClick = useCallback(() => {
    navigate(`/edit/${id}`);
  }, [navigate, id]);

  return (
    <ul className={styles.element}>
      <li className={classnames(styles.elementColumn, additionalStyles.id)}>
        {id}
      </li>
      <li className={classnames(styles.elementColumn, additionalStyles.name)}>
        {name}
      </li>
      <li
        className={classnames(
          styles.elementColumn,
          additionalStyles.description
        )}
      >
        {description}
      </li>
      <li
        className={classnames(
          styles.elementColumn,
          styles.date,
          additionalStyles.date
        )}
      >
        {date}
        {isAdmin && (
          <button
            className={classnames(styles.elementButton, styles.buttonEdit)}
            onClick={handleEditClick}
          >
            <AiOutlineEdit size={15} />
          </button>
        )}
        <button
          className={classnames(styles.elementButton, styles.buttonStart)}
          onClick={handlePlayClick}
        >
          <VscDebugStart size={15} />
        </button>
      </li>
    </ul>
  );
};

export default memo(ListElement);

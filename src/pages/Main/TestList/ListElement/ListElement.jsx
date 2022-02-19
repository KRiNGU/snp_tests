import classnames from 'classnames';
import { memo, useCallback } from 'react';
import styles from './ListElement.module.css';
import { AiOutlineEdit } from 'react-icons/ai';
import { VscDebugStart } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ListElement = ({
  classNames,
  id,
  name,
  description,
  date,
  onClick = () => {},
}) => {
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const navigate = useNavigate();

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      onClick(id);
    },
    [onClick, id]
  );

  const handleEditClick = useCallback(
    (e) => {
      e.stopPropagation();
      navigate(`/edit/${id}`);
    },
    [navigate, id]
  );

  return (
    <div className={styles.element} onClick={handleClick}>
      <div className={classnames(styles.elementColumn, classNames.id)}>
        {id}
      </div>
      <div className={classnames(styles.elementColumn, classNames.name)}>
        {name}
      </div>
      <div className={classnames(styles.elementColumn, classNames.description)}>
        {description}
      </div>
      <div
        className={classnames(
          styles.elementColumn,
          styles.date,
          classNames.date
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
          onClick={handleClick}
        >
          <VscDebugStart size={15} />
        </button>
      </div>
    </div>
  );
};

ListElement.propTypes = {
  classNames: PropTypes.object,
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  onClick: PropTypes.func,
};

export default memo(ListElement);

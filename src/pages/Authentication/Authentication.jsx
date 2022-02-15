import styles from './Authentication.module.css';
import { memo } from 'react';
import PropTypes from 'prop-types';

const Authentication = ({ Children }) => (
  <div className={styles.container}>{Children}</div>
);

Authentication.propTypes = {
  Children: PropTypes.object,
};

export default memo(Authentication);

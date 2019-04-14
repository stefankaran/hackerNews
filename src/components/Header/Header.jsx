import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Routes
import appRoutes from '../../config/app.routes';

// Images
import refreshIcon from '../../assets/images/update-arrows.svg';

// Style
import styles from './Header.module.scss';

// Consts
const HACKER_NEWS_STRING = 'HackerNews';


const Header = (
  {
    updateData,
    isLoading,
  },
) => (
  <header className={styles.Header}>
    <div className={`l ${styles.HeaderBody}`}>
      <h1 className={styles.HeaderTitle}>
        <Link className={styles.HeaderLink} to={appRoutes.INDEX}>{HACKER_NEWS_STRING}</Link>
      </h1>
      <button
        className={styles.HeaderRefresh}
        type="button"
        onClick={updateData}
        disabled={isLoading}
      >
        <img className={styles.HeaderRefreshIcon} src={refreshIcon} alt={HACKER_NEWS_STRING} />
      </button>
    </div>
  </header>
);

export default Header;

Header.propTypes = {
  updateData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

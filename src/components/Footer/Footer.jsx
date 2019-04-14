import React from 'react';
import PropTypes from 'prop-types';

// Style
import styles from './Footer.module.scss';

// Consts
import { REFRESH_TIMER_IN_SECONDS } from '../News/news.constants';


const Footer = (
  {
    refreshTimerSeconds,
  },
) => (
  <footer className={styles.Footer}>
    The Page will be refreshed in {REFRESH_TIMER_IN_SECONDS - refreshTimerSeconds} sec.
  </footer>
);

export default Footer;

Footer.propTypes = {
  refreshTimerSeconds: PropTypes.number.isRequired,
};

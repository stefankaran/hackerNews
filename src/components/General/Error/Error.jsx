import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Routes
import appRoutes from '../../../config/app.routes';

// Style
import styles from './Error.module.scss';


const Error = (
  {
    message,
    buttonText,
  },
) => (
  <div className={styles.Error}>
    <h2 className={styles.Error__message}>{ message }</h2>
    <Link
      className={styles.Error__button}
      to={appRoutes.INDEX}
    >
      { buttonText }
    </Link>
  </div>
);

export default Error;

Error.propTypes = {
  message: PropTypes.string,
  buttonText: PropTypes.string,
};

Error.defaultProps = {
  message: 'Something went wrong.',
  buttonText: 'Return to Homepage',
};

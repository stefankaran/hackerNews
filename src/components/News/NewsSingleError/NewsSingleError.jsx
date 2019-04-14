// eslint-disable-new-line
import React from 'react';
import PropTypes from 'prop-types';

// Style
import styles from './NewsSingleError.module.scss';


const NewsSingleError = (
  {
    errorMessage,
  },
) => (
  <aside className={styles.NewsSingleError}>
    <h3 className={styles.NewsSingleErrorMessage}>{errorMessage}</h3>
  </aside>
);

export default NewsSingleError;

NewsSingleError.propTypes = {
  errorMessage: PropTypes.string,
};

NewsSingleError.defaultProps = {
  errorMessage: 'Something went wrong.',
};

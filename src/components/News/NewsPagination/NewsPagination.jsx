import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Routes
import appRoutes from '../../../config/app.routes';

// Style
import styles from './NewsPagination.module.scss';


const NewsPagination = (
  {
    currentPage,
    totalPages,
  },
) => {
  const firstPage = currentPage === 1;
  const lastPage = currentPage === totalPages;

  return (
    <nav className={styles.NewsPagination}>
      {
        !firstPage
        && (
          <Link
            className={styles.NewsPaginationLink}
            to={`${appRoutes.INDEX}${currentPage - 1}`}
          >
            Prev
          </Link>
        )
      }

      {
        !lastPage
        && (
          <Link
            className={styles.NewsPaginationLink}
            to={`${appRoutes.INDEX}${currentPage + 1}`}
          >
            More
          </Link>
        )
      }
    </nav>
  );
};

export default NewsPagination;

NewsPagination.propTypes = {
  currentPage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  totalPages: PropTypes.number.isRequired,
};

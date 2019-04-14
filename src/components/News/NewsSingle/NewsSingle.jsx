// eslint-disable-new-line
import React from 'react';
import PropTypes from 'prop-types';

// Helpers
import { convertTime } from '../news.helpers';

// Routes
import { HACKER_NEWS_URL } from '../../../config/vendor.routes';

// Style
import styles from './NewsSingle.module.scss';

// Consts
const LINK_COMMON_PROPS = {
  target: '_blank',
};
const PROP_TYPES_DEFAULTS = {
  number: 0,
  string: '',
};

const NewsSingle = (
  {
    id,
    index,
    title,
    url,
    points,
    author,
    time,
    comments,
  },
) => (
  <article className={styles.NewsSingle}>
    <div className={styles.NewsSingleIndex}>{index}.</div>
    <div>
      <header className={styles.NewsSingleHeader}>
        <h2 className={styles.NewsSingleTitle}>
          {title}
          {' '}
          <a
            {...LINK_COMMON_PROPS}
            className={`${styles.NewsSingleColorSecondary}`}
            href={url}
          >
            (<span className={`${styles.NewsSingleLink} ${styles.NewsSingleUrl}`}>{url}</span>)
          </a>
        </h2>
      </header>
      <footer className={styles.NewsSingleFooter}>
        <div className={styles.NewsSingleFooterItem}>{points} points</div>
        <div className={styles.NewsSingleFooterItem}>
          <span className={styles.NewsSingleColorSecondary}>by</span>
          {' '}
          <a
            {...LINK_COMMON_PROPS}
            className={styles.NewsSingleLink}
            href={`${HACKER_NEWS_URL}/user?id=${author}`}
          >
            {author}
          </a>
        </div>
        <div className={`${styles.NewsSingleColorSecondary} ${styles.NewsSingleFooterItem}`}>{convertTime(time)}</div>
        <a
          {...LINK_COMMON_PROPS}
          className={`${styles.NewsSingleLink} ${styles.NewsSingleFooterItem}`}
          href={`${HACKER_NEWS_URL}/item?id=${id}`}
        >
          {comments} comments
        </a>
      </footer>
    </div>
  </article>
);

export default NewsSingle;

NewsSingle.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number,
  title: PropTypes.string,
  url: PropTypes.string,
  points: PropTypes.number,
  author: PropTypes.string,
  time: PropTypes.number,
  comments: PropTypes.number,
};

NewsSingle.defaultProps = {
  index: PROP_TYPES_DEFAULTS.number,
  title: PROP_TYPES_DEFAULTS.string,
  url: PROP_TYPES_DEFAULTS.string,
  points: PROP_TYPES_DEFAULTS.number,
  author: PROP_TYPES_DEFAULTS.string,
  time: PROP_TYPES_DEFAULTS.number,
  comments: PROP_TYPES_DEFAULTS.number,
};

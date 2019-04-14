import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Helpers
import {
  isNumber,
  paramsIdHandler,
} from './news.helpers';

// Actions
import getNewsFromApi from './actions';

// Components
import Loader from '../General/Loader/Loader';
import Error from '../General/Error/Error';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import NewsSingle from './NewsSingle/NewsSingle';
import NewsSingleError from './NewsSingleError/NewsSingleError';
import NewsPagination from './NewsPagination/NewsPagination';

// Style
import styles from './News.module.scss';

// Consts
import {
  NEWS_PER_PAGE,
  REFRESH_TIMER_DEFAULT_SECONDS,
  REFRESH_TIMER_IN_SECONDS,
} from './news.constants';

const INITIAL_STATE = {
  refreshTimerSeconds: REFRESH_TIMER_DEFAULT_SECONDS,
};


class News extends React.Component {
    static propTypes = {
      boundGetNewsFromApi: PropTypes.func.isRequired,
      newsFromRedux: PropTypes.shape({
        isLoading: PropTypes.bool,
        isError: PropTypes.bool,
        data: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.array,
        ]),
      }).isRequired,
      match: PropTypes.shape({
        params: PropTypes.shape({
          id: PropTypes.string,
        }),
      }).isRequired,
    };

    state = { ...INITIAL_STATE };

    componentDidMount() {
      this.getNewsFromApiWithIntervals();
    }

    componentDidUpdate(prevProps) {
      const { refreshTimerSeconds } = this.state;
      const previousPage = paramsIdHandler(prevProps.match.params);

      if (
        (refreshTimerSeconds >= REFRESH_TIMER_IN_SECONDS) // Update data (REFRESH_TIMER_IN_SECONDS)
        || (previousPage !== this.currentPage()) // Update data (Pagination change)
      ) { this.getNewsFromApiWithIntervals(); }
    }

    componentWillUnmount() {
      this.refreshPageClearInterval();
    }

    getNewsFromApiWithIntervals = () => {
      const { boundGetNewsFromApi } = this.props;

      return boundGetNewsFromApi(
        this.currentPage(),
        this.refreshPageSetInterval,
        this.refreshPageClearInterval,
      );
    };

    currentPage = () => {
      const { match } = this.props;

      return paramsIdHandler(match.params);
    };

    refreshPageSetInterval = () => { this.refreshInterval = setInterval(() => this.tick(), 1000); };

    refreshPageClearInterval = () => this.setState(
      INITIAL_STATE,
      clearInterval(this.refreshInterval),
    );

    tick = () => this.setState(prevState => (
      { refreshTimerSeconds: prevState.refreshTimerSeconds + 1 }
    ));

    render() {
      const { refreshTimerSeconds } = this.state;
      const { newsFromRedux } = this.props;
      const {
        totalPages,
        isLoading,
        isError,
        data,
      } = newsFromRedux;

      const isPageNotFound = (
        !isNumber(this.currentPage()) // If current page(:id) is not a number
        || ( // Or if current page is not in range between (1 and totalPages)
          totalPages
          && (
            (this.currentPage() > totalPages)
            || (this.currentPage() <= 0)
          )
        )
      );
      const isLoadingData = (
        (isLoading || (!isLoading && !data))
        && !isError
      );
      const isData = data && !!(data.length) && data;

      const newsList = () => {
        const renderNews = isData.map((news, i) => {
          const index = i + 1;

          // No response
          if (!news) return <NewsSingleError key={`${Math.random()}_${index}`} />;

          return (
            <NewsSingle
              key={news.id}
              id={news.id}
              index={((this.currentPage() - 1) * NEWS_PER_PAGE) + index}
              title={news.title}
              url={news.url}
              points={news.score}
              author={news.by}
              time={news.time}
              comments={news.descendants}
            />
          );
        });

        return <section className={styles.NewsList}>{renderNews}</section>;
      };

      return (
        <div className={styles.News}>
          <Header
            isLoading={isLoadingData}
            updateData={() => this.getNewsFromApiWithIntervals()}
          />
          {
            isPageNotFound
            && !isLoadingData
            && <Error message="Page Not Found" />
          }
          {
            isLoadingData
            && <Loader />
          }
          {
            isError
            && <Error />
          }
          {
            isData
            && newsList()
          }
          {
            isData
            && totalPages > 0
            && <NewsPagination currentPage={this.currentPage()} totalPages={totalPages} />
          }
          {
            !isLoadingData
            && <Footer refreshTimerSeconds={refreshTimerSeconds} />
          }
        </div>
      );
    }
}

const mapStateToProps = state => ({
  newsFromRedux: state.news,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  boundGetNewsFromApi: getNewsFromApi,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(News);

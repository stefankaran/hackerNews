import axios from 'axios';
import ActionTypes from './actionTypes';

// Routes
import { NEWS_ROUTE } from '../../config/vendor.routes';

// Consts
import { NEWS_PER_PAGE } from './news.constants';


const newsStart = () => ({
  type: ActionTypes.NEWS_START,
});

const newsError = error => ({
  type: ActionTypes.NEWS_ERROR,
  payload: error,
});

const newsSuccess = (news, totalPages) => ({
  type: ActionTypes.NEWS_SUCCESS,
  payload: news,
  totalPages,
});

const getNewsSingleFromApi = id => (
  axios({
    metod: 'GET',
    url: `${NEWS_ROUTE}/item/${id}.json`,
    dataType: 'json',
  })
    .then(success => success.data)
    .catch(error => error)
);

const getNewsFromApi = (
  page,
  refreshPageSetInterval,
  refreshPageClearInterval,
) => (dispatch) => {
  dispatch(newsStart(), refreshPageClearInterval()); // In Progress and clear interval(refresh)

  axios({
    metod: 'GET',
    url: `${NEWS_ROUTE}/topstories.json`,
    dataType: 'json',
  })
    .then((success) => {
      const { data } = success;
      const currentPage = page - 1;
      const totalPages = Math.ceil(data.length / NEWS_PER_PAGE);
      const sliceNews = data.slice(
        (currentPage * NEWS_PER_PAGE),
        ((currentPage * NEWS_PER_PAGE) + NEWS_PER_PAGE),
      );

      const results = Promise.all(sliceNews.map(id => getNewsSingleFromApi(id)));

      // When Redux is populated, start interval
      results.then(news => dispatch(newsSuccess(news, totalPages)), refreshPageSetInterval());
    })
    .catch((error) => {
      dispatch(newsError(error));
    });
};

export default getNewsFromApi;

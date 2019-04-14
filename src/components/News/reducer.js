import ActionTypes from './actionTypes';


const INITIAL_STATE = {
  isLoading: false,
  isError: false,
  data: null,
  totalPages: null,
};

const newsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.NEWS_START:
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: null,
        totalPages: null,
      };

    case ActionTypes.NEWS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: action.payload,
        totalPages: null,
      };

    case ActionTypes.NEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
        totalPages: action.totalPages,
      };

    default:
      return state;
  }
};

export default newsReducer;

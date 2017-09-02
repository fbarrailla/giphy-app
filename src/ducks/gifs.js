import api from '../api';
import { ITEMS_PER_PAGE } from '../config';

/*
 * Action types
 */

const FETCH_START = 'giphy-app/gifs/FETCH_START';
const FETCH_SUCCESS = 'giphy-app/gifs/FETCH_SUCCESS';
const FETCH_FAILURE = 'giphy-app/gifs/FETCH_FAILURE';
const LOAD_MORE_START = 'giphy-app/gifs/LOAD_MORE_START';
const LOAD_MORE_SUCCESS = 'giphy-app/gifs/LOAD_MORE_SUCCESS';
const LOAD_MORE_FAILURE = 'giphy-app/gifs/LOAD_MORE_FAILURE';

/*
 * Reducer
 */
const initialState = {
  searchString: null,
  loading: false,
  items: [],
  page: 0,
};

const gifsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, loading: true, searchString: action.payload };
    case FETCH_SUCCESS:
      return { ...state, loading: false, items: action.payload.data };
    case LOAD_MORE_START:
      return { ...state, loading: true };
    case LOAD_MORE_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.concat(action.payload.data),
        page: state.page + 1,
      };
    default:
      return state;
  }
};

export default gifsReducer;

/*
 * Action Creators
 */

const fetchStart = searchString => ({
  type: FETCH_START,
  payload: searchString,
});

const fetchSuccess = data => ({
  type: FETCH_SUCCESS,
  payload: data,
});

const fetchFailure = error => ({
  type: FETCH_FAILURE,
  error: true,
  payload: error,
});

const loadMoreStart = searchString => ({
  type: LOAD_MORE_START,
  payload: searchString,
});

const loadMoreSuccess = data => ({
  type: LOAD_MORE_SUCCESS,
  payload: data,
});

const loadMoreFailure = error => ({
  type: LOAD_MORE_FAILURE,
  error: true,
  payload: error,
});

/*
 * Thunks
 */

export const searchGifs = searchString => async dispatch => {
  dispatch(fetchStart(searchString));
  try {
    const response = await api.search({
      q: searchString,
      limit: ITEMS_PER_PAGE,
    });
    dispatch(fetchSuccess(response));
  } catch (err) {
    dispatch(fetchFailure(err));
  }
};

export const loadMoreGifs = () => async (dispatch, getState) => {
  const { page, searchString } = getState().gifs;
  dispatch(loadMoreStart(searchString));
  try {
    const response = await api.search({
      q: searchString,
      limit: ITEMS_PER_PAGE,
      offset: ITEMS_PER_PAGE * (page + 1),
    });
    dispatch(loadMoreSuccess(response));
  } catch (err) {
    dispatch(loadMoreFailure(err));
  }
};

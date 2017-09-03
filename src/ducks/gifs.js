import api from '../api';
import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import { ITEMS_PER_PAGE } from '../config';
import { normalizeById } from '../utils';

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

const byId = (state = {}, action = {}) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return normalizeById(action.payload.data);
    case LOAD_MORE_SUCCESS:
      return {
        ...state,
        ...normalizeById(action.payload.data),
      };
    default:
      return state;
  }
};

const allIds = (state = [], action = {}) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return action.payload.data.map(gif => gif.id);
    case LOAD_MORE_SUCCESS:
      return state.concat(action.payload.data.map(gif => gif.id));
    default:
      return state;
  }
};

const loading = (state = false, action = {}) => {
  switch (action.type) {
    case FETCH_START:
    case LOAD_MORE_START:
      return true;
    case FETCH_SUCCESS:
    case FETCH_FAILURE:
      return false;
    default:
      return state;
  }
};

const pagination = (state = { page: 0 }, action = {}) => {
  switch (action.type) {
    case LOAD_MORE_SUCCESS:
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
};

export default combineReducers({
  allIds,
  byId,
  loading,
  pagination,
});

/**
 * Selectors
 */

const selectAllIds = state => state.gifs.allIds;
const selectById = state => state.gifs.byId;

export const getGifs = createSelector(
  [selectAllIds, selectById],
  (allIds, byId) => allIds.map(id => byId[id]),
);

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

export const searchGifs = searchString => dispatch => {
  dispatch(fetchStart(searchString));
  return api
    .search({
      q: searchString,
      limit: ITEMS_PER_PAGE,
    })
    .then(
      response => dispatch(fetchSuccess(response)),
      err => dispatch(fetchFailure(err)),
    );
};

export const loadMoreGifs = () => async (dispatch, getState) => {
  const { page, searchString } = getState().gifs;
  dispatch(loadMoreStart(searchString));
  return api
    .search({
      q: searchString,
      limit: ITEMS_PER_PAGE,
      offset: ITEMS_PER_PAGE * (page + 1),
    })
    .then(
      response => dispatch(loadMoreSuccess(response)),
      err => dispatch(loadMoreFailure(err)),
    );
};

import api from '../api';
import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import { ITEMS_PER_PAGE } from '../config';
import { normalizeById } from '../utils';

/*
 * Action types
 */

const FETCH_TRENDING_START = 'giphy-app/gifs/FETCH_TRENDING_START';
const FETCH_TRENDING_SUCCESS = 'giphy-app/gifs/FETCH_TRENDING_SUCCESS';
const FETCH_TRENDING_FAILURE = 'giphy-app/gifs/FETCH_TRENDING_FAILURE';

/*
* Reducers
*/

export const byId = (state = {}, action = {}) => {
  switch (action.type) {
    case FETCH_TRENDING_SUCCESS:
      return normalizeById(action.payload.data);
    default:
      return state;
  }
};

const allIds = (state = [], action = {}) => {
  switch (action.type) {
    case FETCH_TRENDING_SUCCESS:
      return action.payload.data.map(gif => gif.id);
    default:
      return state;
  }
};

const loading = (state = false, action = {}) => {
  switch (action.type) {
    case FETCH_TRENDING_START:
      return true;
    case FETCH_TRENDING_SUCCESS:
    case FETCH_TRENDING_FAILURE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  allIds,
  byId,
  loading,
});

/**
 * Selectors
 */

export const selectAllIds = state => state.trending.allIds;
export const selectById = state => state.trending.byId;

export const getTrendingGifs = createSelector(
  [selectAllIds, selectById],
  (allIds, byId) => allIds.map(id => byId[id]),
);

/*
 * Action Creators
 */

const fetchTrendingStart = searchString => ({
  type: FETCH_TRENDING_START,
  payload: searchString,
});

const fetchTrendingSuccess = data => ({
  type: FETCH_TRENDING_SUCCESS,
  payload: data,
});

const fetchTrendingFailure = error => ({
  type: FETCH_TRENDING_FAILURE,
  error: true,
  payload: error,
});

/**
 * Thunks
 */

export const fetchTrendingGifs = () => dispatch => {
  dispatch(fetchTrendingStart());
  return api
    .trending({
      limit: ITEMS_PER_PAGE,
    })
    .then(
      response => dispatch(fetchTrendingSuccess(response)),
      err => dispatch(fetchTrendingFailure(err)),
    );
};

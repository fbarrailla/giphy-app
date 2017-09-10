import api from '../api';
import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import { ITEMS_PER_PAGE } from '../config';
import { normalizeById } from '../utils';
import { navigateToEmptySearch } from './router';

/*
 * Action types
 */

const FETCH_SEARCH_START = 'giphy-app/search/FETCH_SEARCH_START';
const FETCH_SEARCH_SUCCESS = 'giphy-app/search/FETCH_SEARCH_SUCCESS';
const FETCH_SEARCH_FAILURE = 'giphy-app/search/FETCH_SEARCH_FAILURE';
const LOAD_MORE_START = 'giphy-app/search/LOAD_MORE_START';
const LOAD_MORE_SUCCESS = 'giphy-app/search/LOAD_MORE_SUCCESS';
const LOAD_MORE_FAILURE = 'giphy-app/search/LOAD_MORE_FAILURE';
const CLEAR_SEARCH = 'giphy-app/search/CLEAR_SEARCH';
const LEAVE_SCREEN = 'giphy-app/search/LEAVE_SCREEN';
const NEXT_PAGE = 'giphy-app/search/NEXT_PAGE';
const PREVIOUS_PAGE = 'giphy-app/search/PREVIOUS_PAGE';

/*
 * Reducers
 */

const byId = (state = {}, action = {}) => {
  switch (action.type) {
    case FETCH_SEARCH_SUCCESS:
      return normalizeById(action.payload.data);
    case LOAD_MORE_SUCCESS:
      return {
        ...state,
        ...normalizeById(action.payload.data),
      };
    case CLEAR_SEARCH:
      return {};
    default:
      return state;
  }
};

const allIds = (state = [], action = {}) => {
  switch (action.type) {
    case FETCH_SEARCH_SUCCESS:
      return action.payload.data.map(gif => gif.id);
    case LOAD_MORE_SUCCESS:
      return state.concat(action.payload.data.map(gif => gif.id));
    case CLEAR_SEARCH:
      return [];
    default:
      return state;
  }
};

const loading = (state = false, action = {}) => {
  switch (action.type) {
    case FETCH_SEARCH_START:
    case LOAD_MORE_START:
      return true;
    case FETCH_SEARCH_SUCCESS:
    case FETCH_SEARCH_FAILURE:
      return false;
    default:
      return state;
  }
};

const pagination = (state = { page: 0, currentPage: 0 }, action = {}) => {
  switch (action.type) {
    case FETCH_SEARCH_START:
      return { page: 0, currentPage: 0 };
    case FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        total: action.payload.pagination.total_count,
        count: action.payload.pagination.count,
      };
    case LOAD_MORE_SUCCESS:
      return {
        ...state,
        page: state.page + 1,
        count: action.payload.pagination.count,
      };
    case NEXT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };
    case PREVIOUS_PAGE:
      return state.currentPage > 0
        ? { ...state, currentPage: state.currentPage - 1 }
        : state;
    case CLEAR_SEARCH:
      return { page: 0 };
    default:
      return state;
  }
};

const searchString = (state = '', action = {}) => {
  switch (action.type) {
    case FETCH_SEARCH_START:
      return action.payload;
    case CLEAR_SEARCH:
    case LEAVE_SCREEN:
      return '';
    default:
      return state;
  }
};

const lastSearch = (state = '', action = {}) => {
  switch (action.type) {
    case FETCH_SEARCH_START:
      return action.payload;
    case CLEAR_SEARCH:
      return '';
    default:
      return state;
  }
};

export default combineReducers({
  allIds,
  byId,
  loading,
  pagination,
  searchString,
  lastSearch,
});

/**
 * Selectors
 */

export const selectAllIds = state => state.search.allIds;
export const selectById = state => state.search.byId;
export const selectPagination = state => state.search.pagination;

export const getSearchResults = createSelector(
  [selectAllIds, selectById, selectPagination],
  (allIds, byId, { currentPage }) => {
    const offset = currentPage * ITEMS_PER_PAGE;
    return allIds
      .filter((id, index) => index >= offset && index < offset + ITEMS_PER_PAGE)
      .map(id => byId[id]);
  },
);

/*
 * Action Creators
 */

const fetchSearchStart = searchString => ({
  type: FETCH_SEARCH_START,
  payload: searchString,
});

const fetchSearchSuccess = data => ({
  type: FETCH_SEARCH_SUCCESS,
  payload: data,
});

const fetchSearchFailure = error => ({
  type: FETCH_SEARCH_FAILURE,
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

export const leaveSearchScreen = () => ({
  type: LEAVE_SCREEN,
});

const nextPage = () => ({
  type: NEXT_PAGE,
});

export const previousPage = () => ({
  type: PREVIOUS_PAGE,
});

/*
 * Thunks
 */

export const searchGifs = searchString => dispatch => {
  dispatch(fetchSearchStart(searchString));
  return api
    .search({
      q: searchString,
      limit: ITEMS_PER_PAGE,
    })
    .then(
      response => dispatch(fetchSearchSuccess(response)),
      err => dispatch(fetchSearchFailure(err)),
    );
};

export const loadMoreGifs = () => (dispatch, getState) => {
  const state = getState();
  const { searchString } = state.search;
  const { page } = selectPagination(state);
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

export const loadNextPage = () => (dispatch, getState) => {
  const { currentPage, page } = selectPagination(getState());
  if (currentPage + 1 > page) {
    dispatch(loadMoreGifs());
  }
  dispatch(nextPage());
};

export const clearSearch = () => dispatch => {
  dispatch({ type: CLEAR_SEARCH });
  dispatch(navigateToEmptySearch());
};

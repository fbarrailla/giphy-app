import { createSelector } from 'reselect';
import { push } from 'react-router-redux';

/**
 * Actions
 */

export const navigateToSearch = searchStr => push(`/search?q=${searchStr}`);

/**
 * Selectors
 */

const selectSearch = state => state.router.location.search;

export const getSearchParams = createSelector(selectSearch, search => {
  if (search) {
    const urlParams = new URLSearchParams(search);
    return [...urlParams].reduce((acc, [k, v]) => {
      acc[k] = v;
      return acc;
    }, {});
  }
  return {};
});

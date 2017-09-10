import { createSelector } from 'reselect';
import { selectById as selectTrendingIds } from './trending';
import { selectById as selectSearchIds } from './search';
import { selectById as selectFavoritesIds } from './favorites';

/**
 * Action types
 */

const SELECT_GIF = 'giphy-app/gifs/SELECT_GIF';
const UNSELECT_GIF = 'giphy-app/gifs/UNSELECT_GIF';

/**
 * Reducers 
 */

const selectedGifReducer = (state = null, action = {}) => {
  switch (action.type) {
    case SELECT_GIF:
      return action.payload;
    case UNSELECT_GIF:
      return null;
    default:
      return state;
  }
};

export default selectedGifReducer;

/**
 * Selectors
 */

export const getAllGifs = createSelector(
  [selectTrendingIds, selectSearchIds, selectFavoritesIds],
  (trendingIds, searchIds, favoritesIds) => ({
    ...trendingIds,
    ...searchIds,
    ...favoritesIds,
  }),
);

export const selectSelectedGif = state => state.selectedGif;

export const getSelectedGif = createSelector(
  [getAllGifs, selectSelectedGif],
  (allGifs, selectedGif) => (selectedGif ? allGifs[selectedGif] : null),
);

/**
 * Action creators
 */

export const selectGif = id => ({
  type: SELECT_GIF,
  payload: id,
});

export const unselectGif = () => ({
  type: UNSELECT_GIF,
});

import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

/**
 * Action types
 */

const TOGGLE = 'giphy-app/favorites/TOGGLE';
const REMOVE = 'giphy-app/favorites/REMOVE';

/**
  * Reducers
  */

const allIds = (state = [], action = {}) => {
  switch (action.type) {
    case TOGGLE:
      return state.find(id => id === action.payload.id)
        ? state.filter(id => id !== action.payload.id)
        : [action.payload.id, ...state];
    case REMOVE:
      return state.filter(id => id !== action.payload.id);
    default:
      return state;
  }
};

const byId = (state = {}, action = {}) => {
  switch (action.type) {
    case TOGGLE:
      if (state[action.payload.id]) {
        const { [action.payload.id]: filtered, ...nextState } = state;
        return nextState;
      }
      return { ...state, [action.payload.id]: action.payload };

    case REMOVE:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};

const favoritesReducer = combineReducers({
  allIds,
  byId,
});

export default favoritesReducer;

/**
 * Selectors
 */

export const selectAllIds = state => state.favorites.allIds;
export const selectById = state => state.favorites.byId;

export const getFavorites = createSelector(
  [selectAllIds, selectById],
  (allIds, byId) => allIds.map(id => byId[id]),
);

/**
 * Action creators
 */

export const toggleFavorite = gif => ({
  type: TOGGLE,
  payload: gif,
});

export const removeFavorite = gif => ({
  type: REMOVE,
  payload: gif,
});

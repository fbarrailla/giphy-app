import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './ducks';
import { storage } from './utils';
import { STORAGE_KEY_FAVORITES } from './config';

const favStorage = storage(STORAGE_KEY_FAVORITES);

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk];

const store = createStore(
  combineReducers(reducers),
  { favorites: favStorage.load() },
  enhancer(applyMiddleware(...middlewares)),
);

// Listen for changes and store favorites in localStorage
let { favorites: previousFavorites } = store.getState();
store.subscribe(() => {
  const { favorites } = store.getState();
  if (favorites !== previousFavorites) {
    favStorage.save(favorites);
    previousFavorites = favorites;
  }
});

export default store;

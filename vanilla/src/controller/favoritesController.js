import * as view from '../view/favoritesView';
import FavoritesModel from '../model/FavoritesModel';
import { storage } from '../utils';

const favoritesStorage = storage('app/favorites');

const model = new FavoritesModel();

model.on('added', () => {
  favoritesStorage.save(model.getFavorites());
});

model.on('removed', () => {
  favoritesStorage.save(model.getFavorites());
});

export const isFavorite = id =>
  model.getFavorites().find(fav => fav.id === id) !== undefined;

export const addFavorite = gif => model.addFavorite(gif);

export const removeFavorite = id => model.removeFavorite(id);

export const renderScreen = () => {
  view.renderFavoritesGifs(model.getFavorites());
};

export const init = () => {
  const storedFavorites = favoritesStorage.load();
  if (storedFavorites) {
    model.setFavorites(storedFavorites);
  }
};

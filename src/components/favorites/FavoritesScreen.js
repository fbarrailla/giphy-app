import React from 'react';
import { array, func } from 'prop-types';
import GifsGrid from '../gifs/GifsGrid';

const FavoritesScreen = ({ gifs, toggleFavorite, favoritesIds }) => (
  <GifsGrid
    gifs={gifs}
    toggleFavorite={toggleFavorite}
    favoritesIds={favoritesIds}
  />
);

FavoritesScreen.propTypes = {
  gifs: array.isRequired,
  toggleFavorite: func.isRequired,
  favoritesIds: array.isRequired,
};

export default FavoritesScreen;

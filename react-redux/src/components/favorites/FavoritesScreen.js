import React from 'react';
import { array, func } from 'prop-types';
import GifsGrid from '../gifs/GifsGrid';
import BigMessage from '../common/BigMessage';

const FavoritesScreen = ({ gifs, toggleFavorite, favoritesIds, selectGif }) => {
  if (gifs.length === 0) {
    return <BigMessage>No favorites yet !</BigMessage>;
  }
  return (
    <GifsGrid
      gifs={gifs}
      toggleFavorite={toggleFavorite}
      favoritesIds={favoritesIds}
      selectGif={selectGif}
    />
  );
};

FavoritesScreen.propTypes = {
  gifs: array.isRequired,
  toggleFavorite: func.isRequired,
  selectGif: func.isRequired,
  favoritesIds: array.isRequired,
};

export default FavoritesScreen;

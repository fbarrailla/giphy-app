import React from 'react';
import { array, func, bool } from 'prop-types';
import styled from 'styled-components';
import GifsGrid from './GifsGrid';

const LoadMore = styled.div`
  font-size: 20px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
`;

const GifsScreen = ({
  gifs,
  toggleFavorite,
  loadMoreGifs,
  isLoading,
  favoritesIds,
}) => (
  <div>
    <GifsGrid
      gifs={gifs}
      toggleFavorite={toggleFavorite}
      favoritesIds={favoritesIds}
    />
    {/* {!isLoading && <LoadMore onClick={loadMoreGifs}>load more...</LoadMore>} */}
  </div>
);

GifsScreen.propTypes = {
  gifs: array.isRequired,
  toggleFavorite: func.isRequired,
  loadMoreGifs: func.isRequired,
  isLoading: bool.isRequired,
  favoritesIds: array.isRequired,
};

export default GifsScreen;

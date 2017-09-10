import React from 'react';
import { func, array, bool } from 'prop-types';
import styled from 'styled-components';
import Gif from './Gif';
import GifActionsLayer from './GifActionsLayer';

const Wrapper = styled.div`
  &:hover .Gif__actions {
    opacity: 1;
  }
`;

const GifWithActions = ({
  gif,
  toggleFavorite,
  colWidth,
  gutterWidth,
  favoritesIds,
  selectGif,
  width,
  isFavorite,
  children,
}) => (
  <Wrapper>
    <Gif gif={gif} gutterWidth={gutterWidth} width={width}>
      <GifActionsLayer
        gif={gif}
        original={gif.images.original}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        selectGif={selectGif}
      />
    </Gif>
  </Wrapper>
);

GifWithActions.propTypes = {
  toggleFavorite: func.isRequired,
  selectGif: func.isRequired,
  favoritesIds: array.isRequired,
  isFavorite: bool.isRequired,
};

export default GifWithActions;

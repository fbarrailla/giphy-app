import React from 'react';
import { bool, object, func } from 'prop-types';
import styled from 'styled-components';
import EmptyHeartIcon from 'react-icons/lib/ti/heart-outline';
import FullHeartIcon from 'react-icons/lib/ti/heart';
import FullScreenIcon from 'react-icons/lib/md/fullscreen';
import CopyIcon from 'react-icons/lib/fa/copy';
import CopyButton from './CopyButton';

const ActionsWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const Actions = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const Action = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FavoriteButton = styled.div`
  cursor: pointer;
  font-size: ${props => (props.full ? 33 : 30)}px;
  color: rgba(255, 255, 255, 0.8);
`;

const FullScreenButton = styled.div`
  cursor: pointer;
  font-size: 30px;
  color: rgba(255, 255, 255, 0.8);
`;

const GifActionsLayer = ({
  loaded,
  gif,
  original,
  isFavorite,
  toggleFavorite,
  selectGif,
  isLoaded,
}) => {
  const FavoriteIcon = isFavorite ? FullHeartIcon : EmptyHeartIcon;
  if (!isLoaded) {
    return null;
  }
  return (
    <ActionsWrapper className="Gif__actions">
      <Actions>
        <Action>
          <CopyButton url={original.url}>
            <CopyIcon />
          </CopyButton>
        </Action>
        <Action>
          <FavoriteButton
            full={isFavorite}
            title="Add to favorites"
            onClick={() => toggleFavorite(gif)}
          >
            <FavoriteIcon />
          </FavoriteButton>
        </Action>
        <Action>
          <FullScreenButton title="Enlarge" onClick={() => selectGif(gif.id)}>
            <FullScreenIcon />
          </FullScreenButton>
        </Action>
      </Actions>
    </ActionsWrapper>
  );
};

GifActionsLayer.propTypes = {
  isFavorite: bool.isRequired,
  gif: object.isRequired,
  original: object.isRequired,
  toggleFavorite: func.isRequired,
  selectGif: func.isRequired,
};

export default GifActionsLayer;

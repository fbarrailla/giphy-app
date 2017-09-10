import React from 'react';
import styled from 'styled-components';
import { object, func } from 'prop-types';
import CloseIcon from 'react-icons/lib/md/close';
import Gif from './Gif';
import LoadingDots from '../common/LoadingDots';

const maxWidth = 500;
const maxHeight = 500;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.div`
  position: absolute;
  top: -40px;
  right: 0;
  color: white;
  font-size: 30px;
  cursor: pointer;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = ({ isLoaded }) =>
  !isLoaded ? (
    <LoaderWrapper>
      <LoadingDots size={100} />
    </LoaderWrapper>
  ) : null;

const getWidth = gif => {
  const { images: { original: img } } = gif;
  const width = +img.width;
  const height = +img.height;
  if (width < height) {
    if (height > maxHeight) {
      const ratio = maxHeight / height;
      return width * ratio;
    }
  } else if (width < maxWidth) {
    return width;
  }
  return maxWidth;
};

const SelectedGifModal = ({ selectedGif, unselectGif }) => {
  if (!selectedGif) {
    return null;
  }
  return (
    <Wrapper>
      <Gif gif={selectedGif} width={getWidth(selectedGif)} fullSize>
        <CloseButton onClick={unselectGif}>
          <CloseIcon />
        </CloseButton>
        <Loader />
      </Gif>
    </Wrapper>
  );
};

SelectedGifModal.propTypes = {
  selectedGif: object,
  unselectGif: func.isRequired,
};

export default SelectedGifModal;

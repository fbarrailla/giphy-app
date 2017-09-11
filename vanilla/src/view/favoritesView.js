import { renderGifs } from '../view/common';

const $screen = document.querySelector('.screen');

export const renderFavoritesGifs = gifs => {
  if (!gifs.length) {
    $screen.innerHTML = '';
    const $message = document.createElement('div');
    $message.classList.add('big-message');
    $message.innerHTML = 'No favorites yet...';
    $screen.appendChild($message);
  } else {
    renderGifs($screen, gifs);
  }
};

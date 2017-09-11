import { renderGifs } from '../view/common';

const $screen = document.querySelector('.screen');

export const renderTrendingGifs = gifs => {
  renderGifs($screen, gifs);
};

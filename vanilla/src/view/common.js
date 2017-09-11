import copy from 'copy-to-clipboard';
import {
  isFavorite,
  addFavorite,
  removeFavorite,
} from '../controller/favoritesController';

const gutterWidth = 10;
const columns = 4;
const gutters = columns - 1;

/**
 * 
 * @param {HTMLElement} container 
 * @param {array} gifs 
 */
export const renderGifs = (container, gifs) => {
  container.innerHTML = '';
  // make wrapper
  const $wrapper = document.createElement('div');
  $wrapper.classList.add('gifs');
  container.appendChild($wrapper);
  // make grid
  const $grid = document.createElement('div');
  $grid.classList.add('gifs__grid');
  $wrapper.appendChild($grid);
  const { width } = $grid.getBoundingClientRect();
  const colWidth = width / columns - gutterWidth * gutters / columns;
  gifs.map(renderGif(colWidth)).forEach(element => $grid.appendChild(element));
  handlePageScroll($wrapper);
};

export const renderGif = width => gif => {
  const { images: { fixed_width: image, original } } = gif;
  // make wrapper
  const $gifWrapper = document.createElement('div');
  $gifWrapper.gif = gif;
  $gifWrapper.dataset.original_url = original.url;
  $gifWrapper.classList.add('gif');
  $gifWrapper.draw = w => {
    const imgHeight = image.height / image.width * w;
    $gifWrapper.style.height = `${imgHeight}px`;
    $gifWrapper.style.width = `${w}px`;
  };
  $gifWrapper.draw(width);
  // make image
  const $gifImage = document.createElement('img');
  $gifImage.addEventListener('load', onGifLoaded);
  $gifImage.classList.add('gif__image');
  $gifImage.src = image.url;
  $gifWrapper.appendChild($gifImage);
  return $gifWrapper;
};

const renderGifActionsLayer = $gif => {
  // actions layer
  const $layer = document.createElement('div');
  $layer.classList.add('gif__actions-layer');
  $gif.appendChild($layer);
  // wrapper
  const $actions = document.createElement('div');
  $actions.classList.add('gif__actions');
  $layer.appendChild($actions);
  // actions – copy
  const $copyAction = document.createElement('span');
  $copyAction.classList.add('gif__action', 'gif__action__copy', 'icon-copy');
  $copyAction.addEventListener('click', () => {
    copy($gif.dataset.original_url);
    const $copySuccess = document.createElement('span');
    $copySuccess.classList.add('gif__action__copy__success');
    $copySuccess.innerHTML = 'Copied to clipboard !';
    $copyAction.appendChild($copySuccess);
    setTimeout(() => $copyAction.removeChild($copySuccess), 1500);
  });
  $actions.appendChild($copyAction);
  // action – favorite
  const $favoriteAction = document.createElement('span');
  $favoriteAction.classList.add('gif__action', 'gif__action__favorite');
  if (isFavorite($gif.gif.id)) {
    $favoriteAction.classList.add('icon-heart');
  } else {
    $favoriteAction.classList.add('icon-heart-o');
  }
  $favoriteAction.addEventListener('click', () => {
    if (isFavorite($gif.gif.id)) {
      removeFavorite($gif.gif.id);
      $favoriteAction.classList.remove('icon-heart');
      $favoriteAction.classList.add('icon-heart-o');
    } else {
      addFavorite($gif.gif);
      $favoriteAction.classList.add('icon-heart');
      $favoriteAction.classList.remove('icon-heart-o');
    }
  });
  $actions.appendChild($favoriteAction);
};

const onGifLoaded = evt => {
  evt.target.style.visibility = 'visible';
  renderGifActionsLayer(evt.target.parentNode);
};

let onScrollListener;
let onResizeListener;

const handlePageScroll = $gifsWrapper => {
  if (onScrollListener) {
    window.removeEventListener('scroll', onScrollListener);
    window.removeEventListener('resize', onResizeListener);
  }
  onScrollListener = () => {
    if (window.scrollY > 15 && !$gifsWrapper.classList.contains('sticked')) {
      $gifsWrapper.classList.add('sticked');
    } else if (
      window.scrollY <= 15 &&
      $gifsWrapper.classList.contains('sticked')
    ) {
      $gifsWrapper.classList.remove('sticked');
    }
  };
  onResizeListener = () => {
    const $grid = document.querySelector('.gifs__grid');
    const { width } = $grid.getBoundingClientRect();
    const colWidth = width / columns - gutterWidth * gutters / columns;
    document.querySelectorAll('.gif').forEach($gif => $gif.draw(colWidth));
  };
  window.addEventListener('scroll', onScrollListener);
  window.addEventListener('resize', onResizeListener);
};

/**
 * Helpers
 */

export const hasInParents = (el, selector) => {
  if (el !== document && el.matches(selector)) {
    return true;
  }
  if (el.parentNode) {
    return hasInParents(el.parentNode, selector);
  }
  return false;
};

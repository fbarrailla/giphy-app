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
  const { images: { fixed_width: image } } = gif;
  // make wrapper
  const $gifWrapper = document.createElement('div');
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

const onGifLoaded = evt => {
  evt.target.style.visibility = 'visible';
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
  if (el.matches(selector)) {
    return true;
  }
  if (element.parentNode) {
    return hasInParents(el.parentNode, selector);
  }
  return false;
};

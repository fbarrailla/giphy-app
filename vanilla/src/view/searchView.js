import { renderGifs } from '../view/common';
import * as controller from '../controller/searchController';

const $screen = document.querySelector('.screen');
const $searchInput = document.querySelector('.search__input');
const $clearInput = document.querySelector('.search__clear');

const handleSearchInputKeyDown = evt => {
  if (evt.key === 'Enter') {
    controller.doSearch($searchInput.value);
  }
};

const setInputClearable = () => {
  if ($searchInput.value.length) {
    $searchInput.parentNode.classList.add('search--clearable');
  } else {
    $searchInput.parentNode.classList.remove('search--clearable');
  }
};

const handleClearInputClick = evt => {
  $searchInput.value = '';
  $searchInput.focus();
  setInputClearable();
};

export const render = () => {
  $screen.innerHTML = '';
  $searchInput.focus();
};

export const init = () => {
  $searchInput.addEventListener('keydown', handleSearchInputKeyDown);
  $searchInput.addEventListener('keyup', setInputClearable);
  $clearInput.addEventListener('click', handleClearInputClick);
};

export const renderSearchGifs = gifs => {
  renderGifs($screen, gifs);
};

import api from '../api';
import * as view from '../view/searchView';

export const doSearch = query => {
  api
    .search({
      q: query,
      limit: 12,
    })
    .then(
      response => view.renderSearchGifs(response.data),
      err => console.error('Error fetching search gifs...', err),
    );
};

export const init = () => {
  view.init();
};

export const renderScreen = () => {
  view.render();
};

import api from '../api';
import * as view from '../view/trendingView';

const fetchAndRenderTrendingGifs = () => {
  api
    .trending({
      limit: 12,
    })
    .then(
      response => view.renderTrendingGifs(response.data),
      err => console.error('Error fetching trending gifs...', err),
    );
};

export const init = () => {
  fetchAndRenderTrendingGifs();
};

import history from '../history';
import * as trendingController from './trendingController';
import * as searchController from './searchController';
import * as favoritesController from './favoritesController';

const controllersByPath = {
  '/trending': trendingController,
  '/search': searchController,
  '/favorites': favoritesController,
};

const { location } = history;

export const init = () => {
  let oldPathname;
  history.listen(({ pathname }) => {
    if (pathname !== oldPathname) {
      if (controllersByPath[pathname]) {
        controllersByPath[pathname].init();
      }
      oldPathname = pathname;
    }
  });

  if (controllersByPath[location.pathname]) {
    controllersByPath[location.pathname].init();
  }
};

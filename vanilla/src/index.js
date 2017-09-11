import initView from './view/initView';
import * as routerController from './controller/routerController';
import * as trendingController from './controller/trendingController';
import * as searchController from './controller/searchController';
import * as favoritesController from './controller/favoritesController';

initView();

trendingController.init();
searchController.init();
favoritesController.init();

routerController.init();

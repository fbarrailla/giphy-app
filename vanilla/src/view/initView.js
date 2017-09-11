import history from '../history';
import { setActiveMenuLink, hasInParents } from './common';
import { init as initRouter } from './routerView';

export default () => {
  /**
   * Intercept clicks on links and do history.pushState
   * instead of be redirected (prevent page reload)
   */
  document.addEventListener('click', evt => {
    if (hasInParents(evt.target, 'a')) {
      evt.preventDefault();
      history.push(evt.target.getAttribute('href'));
    }
  });

  initRouter();
};

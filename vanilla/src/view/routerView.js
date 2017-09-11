import history from '../history';

const setActiveMenuLink = to => {
  document
    .querySelectorAll('.menu__item > a')
    .forEach($link => $link.classList.remove('active'));
  document
    .querySelector(`.menu__item > a[href="${to}"]`)
    .classList.add('active');
};

export const init = () => {
  // Set initial menu active link
  const { location } = history;
  if (location.pathname.length > 1) {
    setActiveMenuLink(location.pathname);
  }

  // Set menu active link on change
  let oldPathname = '';
  history.listen(({ pathname }) => {
    if (pathname !== oldPathname) {
      if (pathname !== '/') {
        setActiveMenuLink(pathname);
      } else {
        history.push('/trending');
      }
      oldPathname = pathname;
    }
  });

  // initial redirection
  if (location.pathname === '/') {
    history.push('/trending');
  }
};

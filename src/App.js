import React from 'react';
import { func, string, object } from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Route, Redirect } from 'react-router-dom';
import Header from './components/common/Header';
import SearchGifsScreen from './components/search/SearchGifsScreenContainer';
import TrendingGifsScreen from './components/trending/TrendingGifsScreenContainer';
import FavoritesScreen from './components/favorites/FavoritesScreenContainer';
import SelectedGifModal from './components/gifs/SelectedGifModalContainer';
import theme from './theme';

const Wrapper = styled.div`
  padding-top: 88px;
  margin-bottom: 20px;
`;

const Screens = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const App = ({ searchGifs, searchString, clearSearch, lastSearch, router }) => (
  <ThemeProvider theme={theme}>
    <Wrapper>
      <Header
        searchGifs={searchGifs}
        searchString={searchString}
        clearSearch={clearSearch}
        lastSearch={lastSearch}
        router={router}
      />
      <Screens>
        <Route exact path="/" render={() => <Redirect to="/trending" />} />
        <Route path="/trending" component={TrendingGifsScreen} />
        <Route path="/search" component={SearchGifsScreen} />
        <Route path="/favorites" component={FavoritesScreen} />
      </Screens>
      <SelectedGifModal />
    </Wrapper>
  </ThemeProvider>
);

App.propTypes = {
  searchGifs: func.isRequired,
  searchString: string.isRequired,
  lastSearch: string.isRequired,
  clearSearch: func.isRequired,
  router: object.isRequired,
};

export default App;

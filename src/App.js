import React from 'react';
import { func } from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Route, Redirect } from 'react-router-dom';
import Header from './components/common/Header';
import GifsScreen from './components/gifs/GifsScreenContainer';
import FavoritesScreen from './components/favorites/FavoritesScreenContainer';
import theme from './theme';

const Wrapper = styled.div`
  padding-top: 88px;
  margin-bottom: 20px;
`;

const Screens = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const App = ({ searchGifs }) => (
  <ThemeProvider theme={theme}>
    <Wrapper>
      <Header searchGifs={searchGifs} />
      <Screens>
        <Route exact path="/" render={() => <Redirect to="/search" />} />
        <Route exact path="/search" component={GifsScreen} />
        <Route path="/favorites" component={FavoritesScreen} />
      </Screens>
    </Wrapper>
  </ThemeProvider>
);

App.propTypes = {
  searchGifs: func.isRequired,
};

export default App;

import React, { PureComponent } from 'react';
import { array, func, bool, string } from 'prop-types';
import styled from 'styled-components';
import GifsGrid from './GifsGrid';

const LoadMore = styled.div`
  font-size: 20px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
`;

const Credits = styled.a`
  display: block;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.3);
`;

const Giphy = styled.span`color: ${props => props.theme.main};`;

export default class GifsScreen extends PureComponent {
  static propTypes = {
    gifs: array.isRequired,
    toggleFavorite: func.isRequired,
    loadMoreGifs: func.isRequired,
    isLoading: bool.isRequired,
    favoritesIds: array.isRequired,
    searchString: string,
    searchGifs: func.isRequired,
  };
  componentDidMount() {
    const { searchGifs, searchString } = this.props;
    if (searchString) {
      searchGifs(searchString);
    }
  }
  componentWillReceiveProps({ searchString, searchGifs }) {
    if (searchString && searchString !== this.props.searchString) {
      searchGifs(searchString);
    }
  }
  render() {
    const {
      gifs,
      toggleFavorite,
      loadMoreGifs,
      isLoading,
      favoritesIds,
    } = this.props;
    return (
      <div>
        {gifs.length > 0 && (
          <GifsGrid
            gifs={gifs}
            toggleFavorite={toggleFavorite}
            favoritesIds={favoritesIds}
          />
        )}
        {/* {!isLoading && <LoadMore onClick={loadMoreGifs}>load more...</LoadMore>} */}
        {gifs.length > 0 && (
          <Credits href="https://giphy.com" target="_blank">
            powered by <Giphy>Giphy</Giphy>
          </Credits>
        )}
      </div>
    );
  }
}

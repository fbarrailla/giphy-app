import React, { PureComponent } from 'react';
import { array, func, bool, string, object } from 'prop-types';
import styled from 'styled-components';
import PrevIcon from 'react-icons/lib/md/navigate-before';
import NextIcon from 'react-icons/lib/md/navigate-next';
import GifsGrid from '../gifs/GifsGrid';
import Credits from '../common/Credits';
import BigMessage from '../common/BigMessage';

const NavButton = styled.div`
  position: fixed;
  top: 200px;
  font-size: 50px;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.2 : 1)};
`;

const Previous = styled(NavButton)`left: 5%;`;

const Next = styled(NavButton)`right: 5%;`;

export default class GifsScreen extends PureComponent {
  static propTypes = {
    gifs: array.isRequired,
    toggleFavorite: func.isRequired,
    isLoading: bool.isRequired,
    favoritesIds: array.isRequired,
    searchString: string,
    searchGifs: func.isRequired,
    pagination: object.isRequired,
    leaveSearchScreen: func.isRequired,
    selectGif: func.isRequired,
    loadNextPage: func.isRequired,
    previousPage: func.isRequired,
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
  componentWillUnmount() {
    this.props.leaveSearchScreen();
  }
  render() {
    const {
      gifs,
      toggleFavorite,
      favoritesIds,
      pagination,
      selectGif,
      previousPage,
      loadNextPage,
      hasNextPage,
      hasPreviousPage,
    } = this.props;
    return (
      <div>
        {pagination.total === 0 && <BigMessage>No results...</BigMessage>}
        {pagination.total > 0 && (
          <Previous
            disabled={!hasPreviousPage}
            onClick={hasPreviousPage && previousPage}
          >
            <PrevIcon />
          </Previous>
        )}
        {pagination.total > 0 && (
          <Next disabled={!hasNextPage} onClick={hasNextPage && loadNextPage}>
            <NextIcon />
          </Next>
        )}
        {gifs.length > 0 && (
          <GifsGrid
            gifs={gifs}
            toggleFavorite={toggleFavorite}
            favoritesIds={favoritesIds}
            selectGif={selectGif}
          />
        )}
        <Credits visible={gifs.length > 0} />
      </div>
    );
  }
}

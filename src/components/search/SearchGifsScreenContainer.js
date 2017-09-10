import { connect } from 'react-redux';
import { ITEMS_PER_PAGE } from '../../config';
import SearchGifsScreen from './SearchGifsScreen.js';
import { toggleFavorite } from '../../ducks/favorites';
import { getSearchParams } from '../../ducks/router';
import { selectGif } from '../../ducks/gifs';
import {
  searchGifs,
  getSearchResults,
  leaveSearchScreen,
  loadNextPage,
  previousPage,
} from '../../ducks/search';

const mapStateToProps = state => {
  const pagination = state.search.pagination;
  return {
    gifs: getSearchResults(state),
    pagination: state.search.pagination,
    isLoading: state.search.loading,
    favoritesIds: state.favorites.allIds,
    searchString: getSearchParams(state).q,
    hasPreviousPage: pagination.currentPage !== 0,
    hasNextPage:
      pagination.currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE <
      pagination.total,
  };
};

const mapDispatchToProps = {
  toggleFavorite,
  searchGifs,
  leaveSearchScreen,
  selectGif,
  loadNextPage,
  previousPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchGifsScreen);

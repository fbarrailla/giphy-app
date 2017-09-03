import { connect } from 'react-redux';
import GifsScreen from './GifsScreen.js';
import { toggleFavorite } from '../../ducks/favorites';
import { loadMoreGifs, searchGifs, getGifs } from '../../ducks/gifs';
import { getSearchParams } from '../../ducks/router';

const mapStateToProps = state => ({
  gifs: getGifs(state),
  isLoading: state.gifs.loading,
  favoritesIds: state.favorites.allIds,
  searchString: getSearchParams(state).q,
});

const mapDispatchToProps = {
  toggleFavorite,
  loadMoreGifs,
  searchGifs,
};

export default connect(mapStateToProps, mapDispatchToProps)(GifsScreen);

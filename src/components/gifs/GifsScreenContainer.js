import { connect } from 'react-redux';
import GifsScreen from './GifsScreen.js';
import { toggleFavorite } from '../../ducks/favorites';
import { loadMoreGifs } from '../../ducks/gifs';

const mapStateToProps = state => ({
  gifs: state.gifs.items,
  isLoading: state.gifs.loading,
  favoritesIds: state.favorites.allIds,
});

const mapDispatchToProps = {
  toggleFavorite,
  loadMoreGifs,
};

export default connect(mapStateToProps, mapDispatchToProps)(GifsScreen);

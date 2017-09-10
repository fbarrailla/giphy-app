import { connect } from 'react-redux';
import FavoritesScreen from './FavoritesScreen.js';
import { toggleFavorite, getFavorites } from '../../ducks/favorites';
import { selectGif } from '../../ducks/gifs';

const mapStateToProps = state => ({
  gifs: getFavorites(state),
  favoritesIds: state.favorites.allIds,
});

const mapDispatchToProps = {
  toggleFavorite,
  selectGif,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);

import { connect } from 'react-redux';
import FavoritesScreen from './FavoritesScreen.js';
import { toggleFavorite, getFavorites } from '../../ducks/favorites';

const mapStateToProps = state => ({
  gifs: getFavorites(state),
  favoritesIds: state.favorites.allIds,
});

const mapDispatchToProps = {
  toggleFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);

import { connect } from 'react-redux';
import TrendingGifsScreen from './TrendingGifsScreen.js';
import { toggleFavorite } from '../../ducks/favorites';
import { fetchTrendingGifs, getTrendingGifs } from '../../ducks/trending';
import { selectGif } from '../../ducks/gifs';

const mapStateToProps = state => ({
  gifs: getTrendingGifs(state),
  isLoading: state.trending.loading,
  favoritesIds: state.favorites.allIds,
});

const mapDispatchToProps = {
  toggleFavorite,
  fetchTrendingGifs,
  selectGif,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrendingGifsScreen);

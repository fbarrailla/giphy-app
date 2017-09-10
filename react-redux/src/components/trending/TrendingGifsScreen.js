import React, { PureComponent } from 'react';
import { array, func, bool } from 'prop-types';
import GifsGrid from '../gifs/GifsGrid';
import Credits from '../common/Credits';

export default class TrendingGifsScreen extends PureComponent {
  static propTypes = {
    gifs: array.isRequired,
    toggleFavorite: func.isRequired,
    isLoading: bool.isRequired,
    favoritesIds: array.isRequired,
    fetchTrendingGifs: func.isRequired,
    selectGif: func.isRequired,
  };
  componentDidMount() {
    this.props.fetchTrendingGifs();
  }
  render() {
    const { gifs, toggleFavorite, favoritesIds, selectGif } = this.props;
    return (
      <div>
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

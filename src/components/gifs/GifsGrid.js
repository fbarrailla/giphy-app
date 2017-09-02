import React, { PureComponent } from 'react';
import { array, func } from 'prop-types';
import styled from 'styled-components';
import Gif from './Gif';

const gutterWidth = 10;
const columns = 4;
const gutters = columns - 1;

const Grid = styled.div`
  column-count: ${columns};
  column-gap: 10px;
`;

class GifsGrid extends PureComponent {
  static propTypes = {
    gifs: array.isRequired,
    toggleFavorite: func.isRequired,
    favoritesIds: array.isRequired,
  };

  state = {
    colWidth: -1,
  };

  componentDidMount() {
    this.updateColWidth();
    window.addEventListener('resize', this.updateColWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateColWidth);
  }

  updateColWidth = () => {
    const { width } = this.gridEl.getBoundingClientRect();
    this.setState({
      colWidth: width / columns - gutterWidth * gutters / columns,
    });
  };

  render() {
    const { colWidth } = this.state;
    const { gifs, toggleFavorite, favoritesIds } = this.props;
    return (
      <Grid innerRef={el => (this.gridEl = el)}>
        {gifs.map(gif => (
          <Gif
            key={gif.id}
            gif={gif}
            toggleFavorite={toggleFavorite}
            colWidth={colWidth}
            gutterWidth={gutterWidth}
            favoritesIds={favoritesIds}
          />
        ))}
      </Grid>
    );
  }
}

export default GifsGrid;

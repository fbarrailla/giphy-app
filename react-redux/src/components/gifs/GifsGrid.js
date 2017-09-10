import React, { PureComponent } from 'react';
import { array, func } from 'prop-types';
import styled from 'styled-components';
import GifWithActions from './GifWithActions';

const gutterWidth = 10;
const columns = 4;
const gutters = columns - 1;

const Wrapper = styled.div`
  background-color: ${props => props.theme.lightGrey};
  padding: 10px;
  &::before {
    content: '';
    display: ${props => (props.sticked ? 'block' : 'none')};
    position: fixed;
    top: ${props => props.theme.headerHeight};
    left: 10%;
    right: 10%;
    height: 10px;
    background: ${props => props.theme.lightGrey};
    z-index: 10;
  }
`;

const Grid = styled.div`
  column-count: ${columns};
  column-gap: 10px;
`;

class GifsGrid extends PureComponent {
  static propTypes = {
    gifs: array.isRequired,
    toggleFavorite: func.isRequired,
    favoritesIds: array.isRequired,
    selectGif: func.isRequired,
  };

  state = {
    colWidth: -1,
    sticked: false,
  };

  componentDidMount() {
    this.updateColWidth();
    window.addEventListener('resize', this.updateColWidth);
    window.addEventListener('scroll', this.stickTopBorder);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateColWidth);
    window.removeEventListener('scroll', this.stickTopBorder);
  }

  stickTopBorder = () => {
    if (window.scrollY > 15 && this.state.sticked === false) {
      this.setState({ sticked: true });
    } else if (window.scrollY <= 15 && this.state.sticked === true) {
      this.setState({ sticked: false });
    }
  };

  updateColWidth = () => {
    const { width } = this.gridEl.getBoundingClientRect();
    this.setState({
      colWidth: width / columns - gutterWidth * gutters / columns,
    });
  };

  render() {
    const { colWidth, sticked } = this.state;
    const { gifs, toggleFavorite, favoritesIds, selectGif } = this.props;
    return (
      <Wrapper sticked={sticked}>
        <Grid innerRef={el => (this.gridEl = el)}>
          {gifs.map(gif => (
            <GifWithActions
              key={gif.id}
              gif={gif}
              toggleFavorite={toggleFavorite}
              width={colWidth}
              gutterWidth={gutterWidth}
              favoritesIds={favoritesIds}
              selectGif={selectGif}
              isFavorite={favoritesIds.indexOf(gif.id) !== -1}
            />
          ))}
        </Grid>
      </Wrapper>
    );
  }
}

export default GifsGrid;

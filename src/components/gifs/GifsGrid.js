import React, { PureComponent } from 'react';
import { array, func } from 'prop-types';
import styled from 'styled-components';
import Gif from './Gif';

const gutterWidth = 10;
const columns = 4;
const gutters = columns - 1;

const borderColor = '#e5e5e5';

const Wrapper = styled.div`
  background-color: ${borderColor};
  padding: 10px;
  &::before {
    content: '';
    display: ${props => (props.sticked ? 'block' : 'none')};
    position: fixed;
    top: 74px;
    left: 10%;
    right: 10%;
    height: 10px;
    background: ${borderColor};
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
    const { gifs, toggleFavorite, favoritesIds } = this.props;
    return (
      <Wrapper sticked={sticked}>
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
      </Wrapper>
    );
  }
}

export default GifsGrid;

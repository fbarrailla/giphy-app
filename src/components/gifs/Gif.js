import React, { PureComponent } from 'react';
import { string, func, shape, object, number, array } from 'prop-types';
import styled from 'styled-components';
import GifActionsLayer from './GifActionsLayer';
import { randomElement } from '../../utils';

const loaderColors = ['#fee7e2', '#fffcd5', '#e1f2fc', '#dbedd6', '#e6e7e8'];
const loaderColorDelay = 2; // seconds

const Wrapper = styled.div`
  width: 100%;
  break-inside: avoid-column;
  margin-bottom: ${props => props.gutterWidth}px;
  position: relative;
  overflow: hidden;
  &:hover > .Gif__actions {
    opacity: 1;
  }
  transition: background-color ${loaderColorDelay}s ease-in-out;
`;

const Image = styled.img`
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  width: 100%;
`;

export default class Gif extends PureComponent {
  static propTypes = {
    gif: shape({
      id: string.isRequired,
      images: object.isRequired,
    }).isRequired,
    toggleFavorite: func.isRequired,
    colWidth: number.isRequired,
    gutterWidth: number.isRequired,
    favoritesIds: array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loaderColor: randomElement(loaderColors),
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const nextIndex = loaderColors.indexOf(this.state.loaderColor) + 1;
      const nextColor = loaderColors[nextIndex] || loaderColors[0];
      this.setState({ loaderColor: nextColor });
    }, loaderColorDelay * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onLoad = evt => {
    this.setState({
      loaded: true,
    });
    // clear loader
    clearInterval(this.interval);
  };

  render() {
    const { loaded, loaderColor } = this.state;
    const {
      gif: { id, images: { fixed_width: image, original } },
      toggleFavorite,
      colWidth,
      gutterWidth,
      favoritesIds,
    } = this.props;

    const imgHeight = image.height / image.width * colWidth;
    const isFavorite = favoritesIds.indexOf(id) !== -1;

    return (
      <Wrapper
        height={imgHeight}
        gutterWidth={gutterWidth}
        style={{
          height: imgHeight,
          backgroundColor: loaded ? '#edf7ff' : loaderColor,
        }}
      >
        <Image src={image.url} onLoad={this.onLoad} visible={loaded} />
        <GifActionsLayer
          loaded={loaded}
          gif={this.props.gif}
          original={original}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
      </Wrapper>
    );
  }
}

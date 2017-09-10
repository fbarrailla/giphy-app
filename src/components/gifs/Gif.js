import React, { Children, PureComponent } from 'react';
import { string, shape, object, number, bool } from 'prop-types';
import styled from 'styled-components';

import { randomElement } from '../../utils';

const loaderColors = ['#fee7e2', '#fffcd5', '#e1f2fc', '#dbedd6', '#f0d1ff'];
const loaderColorDelay = 2; // seconds

const Wrapper = styled.div`
  break-inside: avoid-column;
  margin-bottom: ${props => props.gutterWidth}px;
  position: relative;
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
    gutterWidth: number,
    width: number.isRequired,
    fullSize: bool,
  };

  static defaultProps = {
    gutterWidth: 0,
    fullSize: false,
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
    // little hack to cancel image loading
    // @see https://stackoverflow.com/questions/5278304/how-to-cancel-an-image-from-loading
    this.img.src = '';
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
      gif: {
        images: { [this.props.fullSize ? 'original' : 'fixed_width']: image },
      },
      width,
      gutterWidth,
      children,
    } = this.props;

    const imgHeight = image.height / image.width * width;

    return (
      <Wrapper
        height={imgHeight}
        gutterWidth={gutterWidth}
        style={{
          height: imgHeight,
          backgroundColor: loaded ? '#edf7ff' : loaderColor,
          width,
        }}
      >
        <Image
          src={image.url}
          onLoad={this.onLoad}
          visible={loaded}
          innerRef={el => (this.img = el)}
        />
        {children &&
          Children.map(children, child =>
            React.cloneElement(child, {
              isLoaded: loaded,
            }),
          )}
      </Wrapper>
    );
  }
}

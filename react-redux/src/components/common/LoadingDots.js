import React, { PureComponent } from 'react';
import { number } from 'prop-types';

export default class LoadingDots extends PureComponent {
  static propTypes = {
    size: number,
  };

  static defaultProps = {
    size: 50,
  };

  state = {
    index: 0,
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, 800);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => {
    const { index } = this.state;
    this.setState({ index: index === 2 ? 0 : index + 1 });
  };

  renderDot = index => {
    return (
      <span
        style={{
          color: index === this.state.index ? '#000' : 'rgba(0, 0, 0, .5)',
        }}
      >
        .
      </span>
    );
  };

  render() {
    const { size } = this.props;
    return (
      <div
        style={{
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontSize: size,
          lineHeight: `${size}px`,
          marginTop: -size / 2,
        }}
      >
        {this.renderDot(0)}
        {this.renderDot(1)}
        {this.renderDot(2)}
      </div>
    );
  }
}

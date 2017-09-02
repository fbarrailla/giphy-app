import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import copy from 'copy-to-clipboard';
import styled from 'styled-components';
import CopyIcon from 'react-icons/lib/fa/copy';

const Wrapper = styled.div`
  cursor: pointer;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
  position: relative;
`;

const SuccessMessage = styled.div`
  color: white;
  font-size: 14px;
  position: absolute;
  top: -20px;
  width: 100px;
  left: -25px;
  top: -40px;
`;

export default class CopyButton extends PureComponent {
  static propTypes = {
    url: string.isRequired,
  };

  state = {
    showSuccessMessage: false,
  };

  componentWillUnmout() {
    clearTimeout(this.timeout);
  }

  onClick = () => {
    const { url } = this.props;
    copy(url);
    this.setState({ showSuccessMessage: true });
    this.timeout = setTimeout(
      () => this.setState({ showSuccessMessage: false }),
      1500,
    );
  };

  render() {
    const { showSuccessMessage } = this.state;

    return (
      <Wrapper title="Copy to clipboard" onClick={this.onClick}>
        <CopyIcon />
        {showSuccessMessage && (
          <SuccessMessage>Copied to clipboard !</SuccessMessage>
        )}
      </Wrapper>
    );
  }
}

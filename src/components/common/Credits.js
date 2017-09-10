import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.a`
  display: block;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.3);
`;

const Giphy = styled.span`color: ${props => props.theme.main};`;

const Credits = ({ visible }) =>
  visible && (
    <Wrapper href="https://giphy.com" target="_blank">
      powered by <Giphy>Giphy</Giphy>
    </Wrapper>
  );

export default Credits;

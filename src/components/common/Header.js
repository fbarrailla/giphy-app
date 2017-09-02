import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';
import SearchInput from './SearchInput';
import Menu from './Menu';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  z-index: 10;
`;

const Header = ({ searchGifs }) => (
  <Wrapper>
    <SearchInput searchGifs={searchGifs} />
    <Menu />
  </Wrapper>
);

Header.propTypes = {
  searchGifs: func.isRequired,
};

export default Header;

import React from 'react';
import { func } from 'prop-types';
import { NavLink } from 'react-router-dom';
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

const HomeLink = styled(NavLink)`
  position: absolute;
  left: 10%;
  top: 12px;
  text-decoration: none;
  background-color: ${props => props.theme.main};
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
`;

const Logo = styled.h1`
  font-family: 'Marck Script';
  font-size: 25px;
  color: white;
`;

const Header = ({ searchGifs }) => (
  <Wrapper>
    <HomeLink to="/">
      <Logo>G</Logo>
    </HomeLink>
    <SearchInput searchGifs={searchGifs} />
    <Menu />
  </Wrapper>
);

Header.propTypes = {
  searchGifs: func.isRequired,
};

export default Header;

import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Wrapper = styled.div`
  position: absolute;
  right: 10%;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MenuItem = styled(NavLink)`
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  padding-bottom: 5px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.8);
  font-size: 12px;
  & + & {
    margin-left: 20px;
  }
  &.active {
    border-color: ${props => props.theme.main};
  }
`;

const Menu = ({ lastSearch }) => (
  <Wrapper>
    <MenuItem to="/trending" activeClassName="active">
      trending
    </MenuItem>
    <MenuItem
      to={{
        pathname: '/search',
        search: lastSearch ? `q=${lastSearch}` : '',
      }}
      activeClassName="active"
    >
      search
    </MenuItem>
    <MenuItem to="/favorites" activeClassName="active">
      favorites
    </MenuItem>
  </Wrapper>
);

Menu.propTypes = {
  lastSearch: string.isRequired,
};

export default Menu;

import React, { PureComponent } from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';
import SearchIcon from 'react-icons/lib/go/search';
import ClearSearchIcon from 'react-icons/lib/ti/backspace';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Input = styled.input`
  width: 198px;
  font-size: 25px;
  color: rgba(0, 0, 0, 0.8);
  outline: 0;
  margin-left: 10px;
  border: 0;
  background-color: transparent;
`;

const ClearSearch = styled.div`
  font-size: 30px;
  color: rgba(0, 0, 0, 0.4);
  cursor: ${props => (props.visible ? 'pointer' : 'default')};
  transition: color 0.2s, opacity 0.2s ease-in;
  &:hover {
    color: rgba(0, 0, 0, 0.8);
  }
  opacity: ${props => (props.visible ? 1 : 0)};
  height: 30px;
`;

const BigSearchIcon = styled(SearchIcon)`
  font-size: 25px;
  color: ${props => props.theme.main};
`;

export default class SearchInput extends PureComponent {
  static propTypes = {
    searchGifs: func.isRequired,
  };

  state = {
    searchString: '',
  };

  handleInputChange = evt => {
    this.setState({
      searchString: evt.target.value,
    });
  };

  handleSearchIconClick = () => {
    this.input.focus();
  };

  clearSearch = () => {
    this.setState({ searchString: '' });
    this.input.focus();
  };

  render() {
    const { searchString } = this.state;
    const { searchGifs } = this.props;

    return (
      <Wrapper>
        <BigSearchIcon onClick={this.handleSearchIconClick} />
        <Input
          onChange={this.handleInputChange}
          value={searchString}
          placeholder="Search for a gif"
          innerRef={input => (this.input = input)}
          onKeyPress={evt => evt.key === 'Enter' && searchGifs(searchString)}
        />
        <ClearSearch visible={searchString.length} onClick={this.clearSearch}>
          <ClearSearchIcon style={{ position: 'absolute' }} />
        </ClearSearch>
      </Wrapper>
    );
  }
}

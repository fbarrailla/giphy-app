import styled from 'styled-components';

const BigMessage = styled.div`
  padding: 50px;
  background-color: ${props => props.theme.lightGrey};
  font-size: 15px;
  color: rgba(0, 0, 0, 0.8);
  text-align: center;
`;

export default BigMessage;

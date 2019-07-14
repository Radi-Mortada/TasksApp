import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  background-color: cadetblue;
  text-align: center;
  padding: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return (
      <Wrapper>
        <StyledLink to="/">Tasks App</StyledLink>
      </Wrapper>
    );
  }
}

export default Header;

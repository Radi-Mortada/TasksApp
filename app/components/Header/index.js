import React from 'react';
import { Link } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return <Link to="/">Home</Link>;
  }
}

export default Header;

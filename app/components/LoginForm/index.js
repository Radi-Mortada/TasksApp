/**
 *
 * LoginForm
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextInput from 'components/TextInput';

const Wrapper = styled.div`
  width: 100%;
  height: 10rem;
  background-color: #ff24;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
`;

function LoginForm() {
  return (
    <Wrapper>
      <h2>Login</h2>
      <TextInput />
      <TextInput />
    </Wrapper>
  );
}

LoginForm.propTypes = {};

export default memo(LoginForm);

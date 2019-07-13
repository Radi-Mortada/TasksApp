/**
 *
 * Input
 *
 */

import styled from 'styled-components';

const Input = styled.input`
  border: 1px papayawhip solid;
  border-radius: 6px;
  width: 100%;
  height: 3rem;
  color: darkblue;
  padding: 0.5rem;
  &::placeholder {
    color: grey;
  }
`;

Input.propTypes = {};

export default Input;

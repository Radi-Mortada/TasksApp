/**
 *
 * Form
 *
 */

import styled from 'styled-components';
import { Form } from 'formik';

const StyledForm = styled(Form)`
  border: 1px papayawhip solid;
  border-radius: 6px;
  min-width: 20rem;
  padding: 1rem;
  background-color: darkCyan;
`;

StyledForm.propTypes = {};

export default StyledForm;

export * from './partials';

/**
 *
 * SignupFormPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Formik } from 'formik';
import styled from 'styled-components';

import Form, { Input, FormGroup, ErrorMessage } from 'components/Form';
import LoadingIndicator from 'components/LoadingIndicator';
import Page from 'components/Page';
import StyledButton from 'components/Button/StyledButton';
import StyledLinkButton from 'components/Button/StyledLinkButton';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectSignupFormIsLoading,
  makeSelectSignupFormErrorMessage,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { signupInvoked } from './actions';

const ButtonsWrapper = styled.div`
  display: flex;
`;

export function SignupFormPage(props) {
  useInjectReducer({ key: 'signupForm', reducer });
  useInjectSaga({ key: 'signupForm', saga });

  const { onSignupSubmit, isLoading, errorMessage } = props;

  return (
    <Page>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values => {
          const { email, password } = values;
          onSignupSubmit(email, password);
        }}
        render={({ handleChange, handleBlur, values }) => (
          <Form>
            <FormGroup>
              <Input
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="example@domain.com"
                name="email"
              />
            </FormGroup>

            <FormGroup>
              <Input
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="password"
                name="password"
              />
            </FormGroup>
            <ButtonsWrapper>
              <FormGroup>
                {isLoading ? (
                  <LoadingIndicator />
                ) : (
                  <StyledButton type="submit">Submit</StyledButton>
                )}
              </FormGroup>
              <FormGroup>
                <StyledLinkButton to="/login">Login</StyledLinkButton>
              </FormGroup>
            </ButtonsWrapper>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </Form>
        )}
      />
    </Page>
  );
}

SignupFormPage.propTypes = {
  onSignupSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  errorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectSignupFormIsLoading(),
  errorMessage: makeSelectSignupFormErrorMessage(),
});

const mapDispatchToProps = {
  onSignupSubmit: signupInvoked,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SignupFormPage);

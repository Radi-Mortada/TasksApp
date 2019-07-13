/**
 *
 * LoginFormPage
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
  makeSelectLoginFormIsLoading,
  makeSelectLoginFormErrorMessage,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loginInvoked } from './actions';

const ButtonsWrapper = styled.div`
  display: flex;
`;

export function LoginFormPage(props) {
  useInjectReducer({ key: 'loginForm', reducer });
  useInjectSaga({ key: 'loginForm', saga });

  const { onLoginSubmit, isLoading, errorMessage } = props;

  return (
    <Page>
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values => {
          const { email, password } = values;
          onLoginSubmit(email, password);
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
                <StyledLinkButton to="/signup">Signup</StyledLinkButton>
              </FormGroup>
            </ButtonsWrapper>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </Form>
        )}
      />
    </Page>
  );
}

LoginFormPage.propTypes = {
  onLoginSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  errorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoginFormIsLoading(),
  errorMessage: makeSelectLoginFormErrorMessage(),
});

const mapDispatchToProps = {
  onLoginSubmit: loginInvoked,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginFormPage);

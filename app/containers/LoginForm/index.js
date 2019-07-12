/**
 *
 * LoginForm
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Formik } from 'formik';

import Form, { Input, FormGroup, ErrorMessage } from 'components/Form';
import LoadingIndicator from 'components/LoadingIndicator';
import Page from 'components/Page';
import StyledButton from 'components/Button/StyledButton';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectLoginFormIsLoading,
  makeSelectLoginFormErrorMessage,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loginInvoked } from './actions';

export function LoginForm(props) {
  useInjectReducer({ key: 'loginForm', reducer });
  useInjectSaga({ key: 'loginForm', saga });

  const { onLoginSubmit, isLoading, errorMessage } = props;

  return (
    <Page>
      <h1>Login</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={values => {
          const { username, password } = values;
          onLoginSubmit(username, password);
        }}
        render={({ handleChange, handleBlur, values }) => (
          <Form>
            <FormGroup>
              <Input
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                name="username"
              />
            </FormGroup>

            <FormGroup>
              <Input
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                name="password"
              />
            </FormGroup>

            <FormGroup>
              {isLoading ? (
                <LoadingIndicator />
              ) : (
                <StyledButton type="submit">Submit</StyledButton>
              )}
            </FormGroup>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </Form>
        )}
      />
    </Page>
  );
}

LoginForm.propTypes = {
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
)(LoginForm);

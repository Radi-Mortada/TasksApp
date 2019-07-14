/**
 *
 * CreateProjectForm
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
import { createProjectInvoked } from './actions';

export function CreateProjectForm(props) {
  useInjectReducer({ key: 'projectCreatorForm', reducer });
  useInjectSaga({ key: 'projectCreatorForm', saga });

  const { onSubmit, isLoading, errorMessage, initialValues } = props;

  return (
    <Page>
      {!initialValues && <h1>Create project</h1>}
      <Formik
        enableReinitialize
        initialValues={{
          name: '',
          ...initialValues,
        }}
        onSubmit={values => {
          onSubmit(values);
        }}
        render={({ handleChange, handleBlur, values, dirty }) => (
          <Form>
            <FormGroup>
              <Input
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="my project"
                name="name"
              />
            </FormGroup>

            {dirty && (
              <FormGroup>
                {isLoading ? (
                  <LoadingIndicator />
                ) : (
                  <StyledButton type="submit">Submit</StyledButton>
                )}
              </FormGroup>
            )}
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </Form>
        )}
      />
    </Page>
  );
}

CreateProjectForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  errorMessage: PropTypes.string,
  initialValues: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoginFormIsLoading(),
  errorMessage: makeSelectLoginFormErrorMessage(),
});

const mapDispatchToProps = {
  onSubmit: createProjectInvoked,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CreateProjectForm);

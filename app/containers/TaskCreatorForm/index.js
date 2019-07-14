/**
 *
 * CreateTaskForm
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
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectTaskCreatorFormIsLoading,
  makeSelectTaskCreatorFormErrorMessage,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { createTaskInvoked } from './actions';

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function CreateTaskForm(props) {
  useInjectReducer({ key: 'taskCreatorForm', reducer });
  useInjectSaga({ key: 'taskCreatorForm', saga });

  const {
    onSubmit,
    isLoading,
    errorMessage,
    initialValues,
    fieldsDisabled,
  } = props;

  return (
    <Page>
      <h1>
        {initialValues && initialValues.title
          ? initialValues.title
          : 'Create task'}
      </h1>
      <Formik
        enableReinitialize
        initialValues={{
          title: '',
          description: '',
          done: false,
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
                value={values.title}
                placeholder="my task title"
                name="title"
                disabled={fieldsDisabled}
              />
            </FormGroup>

            <FormGroup>
              <Input
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                placeholder="my task description"
                name="description"
                disabled={fieldsDisabled}
              />
            </FormGroup>
            <CheckBoxWrapper>
              <label htmlFor="done">done: </label>
              <Input
                type="checkbox"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.done}
                checked={values.done}
                name="done"
                disabled={fieldsDisabled}
              />
            </CheckBoxWrapper>
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

CreateTaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  errorMessage: PropTypes.string,
  initialValues: PropTypes.object,
  fieldsDisabled: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectTaskCreatorFormIsLoading(),
  errorMessage: makeSelectTaskCreatorFormErrorMessage(),
});

const mapDispatchToProps = {
  onSubmit: createTaskInvoked,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CreateTaskForm);

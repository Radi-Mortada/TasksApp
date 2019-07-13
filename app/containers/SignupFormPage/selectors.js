import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the signupForm state domain
 */

const selectSignupFormDomain = state => state.signupForm || initialState;

/**
 * Other specific selectors
 */
const makeSelectSignupFormIsLoading = () =>
  createSelector(
    selectSignupFormDomain,
    substate => substate.isLoading,
  );

const makeSelectSignupFormErrorMessage = () =>
  createSelector(
    selectSignupFormDomain,
    substate => substate.errorMessage,
  );

/**
 * Default selector used by SignupFormPage
 */

const makeSelectSignupForm = () =>
  createSelector(
    selectSignupFormDomain,
    substate => substate,
  );

export default makeSelectSignupForm;
export {
  selectSignupFormDomain,
  makeSelectSignupFormIsLoading,
  makeSelectSignupFormErrorMessage,
};

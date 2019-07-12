import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginForm state domain
 */

const selectLoginFormDomain = state => state.loginForm || initialState;

/**
 * Other specific selectors
 */
const makeSelectLoginFormIsLoading = () =>
  createSelector(
    selectLoginFormDomain,
    substate => substate.isLoading,
  );

const makeSelectLoginFormErrorMessage = () =>
  createSelector(
    selectLoginFormDomain,
    substate => substate.errorMessage,
  );

/**
 * Default selector used by LoginForm
 */

const makeSelectLoginForm = () =>
  createSelector(
    selectLoginFormDomain,
    substate => substate,
  );

export default makeSelectLoginForm;
export {
  selectLoginFormDomain,
  makeSelectLoginFormIsLoading,
  makeSelectLoginFormErrorMessage,
};

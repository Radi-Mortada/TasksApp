import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the projectCreatorForm state domain
 */

const selectProjectCreatorFormDomain = state =>
  state.projectCreatorForm || initialState;

/**
 * Other specific selectors
 */
const makeSelectProjectCreatorFormIsLoading = () =>
  createSelector(
    selectProjectCreatorFormDomain,
    substate => substate.isLoading,
  );

const makeSelectProjectCreatorFormErrorMessage = () =>
  createSelector(
    selectProjectCreatorFormDomain,
    substate => substate.errorMessage,
  );

/**
 * Default selector used by ProjectCreatorFormPage
 */

const makeSelectProjectCreatorForm = () =>
  createSelector(
    selectProjectCreatorFormDomain,
    substate => substate,
  );

export default makeSelectProjectCreatorForm;
export {
  selectProjectCreatorFormDomain,
  makeSelectProjectCreatorFormIsLoading,
  makeSelectProjectCreatorFormErrorMessage,
};

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the taskCreatorForm state domain
 */

const selectTaskCreatorFormDomain = state =>
  state.taskCreatorForm || initialState;

/**
 * Other specific selectors
 */
const makeSelectTaskCreatorFormIsLoading = () =>
  createSelector(
    selectTaskCreatorFormDomain,
    substate => substate.isLoading,
  );

const makeSelectTaskCreatorFormErrorMessage = () =>
  createSelector(
    selectTaskCreatorFormDomain,
    substate => substate.errorMessage,
  );

const makeSelectIsUpdated = () =>
  createSelector(
    selectTaskCreatorFormDomain,
    substate => substate.isUpdated,
  );

/**
 * Default selector used by TaskCreatorFormPage
 */

const makeSelectTaskCreatorForm = () =>
  createSelector(
    selectTaskCreatorFormDomain,
    substate => substate,
  );

export default makeSelectTaskCreatorForm;
export {
  selectTaskCreatorFormDomain,
  makeSelectTaskCreatorFormIsLoading,
  makeSelectTaskCreatorFormErrorMessage,
  makeSelectIsUpdated,
};

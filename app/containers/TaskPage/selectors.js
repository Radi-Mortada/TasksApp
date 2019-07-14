import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the taskPage state domain
 */

const selectTaskPageDomain = state => state.taskPage || initialState;

/**
 * Other specific selectors
 */

const makeSelectCurrentTaskIsLoaded = () =>
  createSelector(
    selectTaskPageDomain,
    substate => substate.info.isLoaded,
  );

const makeSelectUserCanEditTask = () =>
  createSelector(
    selectTaskPageDomain,
    makeSelectCurrentTaskIsLoaded(),
    (substate, isLoaded) => (isLoaded ? substate.userCanEditTask : undefined),
  );

const makeSelectCurrentTask = () =>
  createSelector(
    selectTaskPageDomain,
    makeSelectCurrentTaskIsLoaded(),
    (substate, isLoaded) => (isLoaded ? substate.task : undefined),
  );

/**
 * Default selector used by TaskPage
 */

const makeSelectTaskPage = () =>
  createSelector(
    selectTaskPageDomain,
    substate => substate,
  );

export default makeSelectTaskPage;
export {
  selectTaskPageDomain,
  makeSelectCurrentTask,
  makeSelectUserCanEditTask,
};

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the projectPage state domain
 */

const selectProjectPageDomain = state => state.projectPage || initialState;

/**
 * Other specific selectors
 */

const makeSelectCurrentProjectTasksIsLoaded = () =>
  createSelector(
    selectProjectPageDomain,
    substate => substate.tasks.info.isLoaded,
  );

const makeSelectCurrentProjectIsAdmin = () =>
  createSelector(
    selectProjectPageDomain,
    substate => substate.tasks.info.isAdmin,
  );

const makeSelectCurrentProject = () =>
  createSelector(
    selectProjectPageDomain,
    makeSelectCurrentProjectTasksIsLoaded(),
    (substate, isLoaded) => (isLoaded ? substate.project : undefined),
  );

const makeSelectCurrentProjectTasks = () =>
  createSelector(
    selectProjectPageDomain,
    makeSelectCurrentProjectTasksIsLoaded(),
    (substate, isLoaded) => (isLoaded ? substate.tasks.data : undefined),
  );

const makeSelectCurrentProjectTasksInDoing = () =>
  createSelector(
    makeSelectCurrentProjectTasks(),
    makeSelectCurrentProjectTasksIsLoaded(),
    (tasksData, isLoaded) => {
      if (!isLoaded) {
        return undefined;
      }
      return tasksData.filter(task => task.done === false);
    },
  );

const makeSelectCurrentProjectTasksInDone = () =>
  createSelector(
    makeSelectCurrentProjectTasks(),
    makeSelectCurrentProjectTasksIsLoaded(),
    (tasksData, isLoaded) => {
      if (!isLoaded) {
        return undefined;
      }
      return tasksData.filter(task => task.done);
    },
  );

/**
 * Default selector used by ProjectPage
 */

const makeSelectProjectPage = () =>
  createSelector(
    selectProjectPageDomain,
    substate => substate,
  );

export default makeSelectProjectPage;
export {
  selectProjectPageDomain,
  makeSelectCurrentProjectTasks,
  makeSelectCurrentProjectTasksInDoing,
  makeSelectCurrentProjectTasksInDone,
  makeSelectCurrentProjectIsAdmin,
  makeSelectCurrentProject,
};

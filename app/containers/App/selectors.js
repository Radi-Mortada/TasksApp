import { createSelector } from 'reselect';

const selectRouter = state => state.router;
const selectAppState = state => state.app;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectUser = () =>
  createSelector(
    selectAppState,
    appState => appState.user.data,
  );

const makeSelectAllProjects = () =>
  createSelector(
    selectAppState,
    appState => appState.projects.data,
  );

export { makeSelectLocation, makeSelectUser, makeSelectAllProjects };

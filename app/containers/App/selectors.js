import { createSelector } from 'reselect';

const selectRouter = state => state && state.router;
const selectAppState = state => state && state.app;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectUser = () =>
  createSelector(
    selectAppState,
    appState => {
      if (!appState) {
        return undefined;
      }
      return appState.user.info;
    },
  );

export { makeSelectLocation, makeSelectUser };

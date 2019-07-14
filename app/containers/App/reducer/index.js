/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import { combineReducers } from 'redux';
import { LOGIN_SUCCESS } from 'containers/LoginFormPage/constants';
import { SIGNUP_SUCCESS } from 'containers/SignupFormPage/constants';
import { LOAD_PROJECTS_SUCCESS } from 'containers/HomePage/constants';

export const userInitialState = {
  data: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = userInitialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_SUCCESS:
      case SIGNUP_SUCCESS: {
        const {
          payload: { user },
        } = action;
        draft.data = user;
        return draft;
      }
      default:
        return state;
    }
  });

export const projectsInitialState = {
  data: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const projectsReducer = (state = userInitialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_PROJECTS_SUCCESS: {
        const {
          payload: { projects },
        } = action;
        draft.data = projects;
        return draft;
      }
      default:
        return state;
    }
  });

export default combineReducers({
  user: userReducer,
  projects: projectsReducer,
});

/*
 *
 * HomePage actions
 *
 */

import {
  LOAD_PROJECTS_INVOKED,
  LOAD_PROJECTS_SUCCESS,
  LOAD_PROJECTS_ERROR,
} from './constants';

export function loadProjectsInvoked() {
  return {
    type: LOAD_PROJECTS_INVOKED,
  };
}

export function loadProjectsSuccess(projects) {
  return {
    type: LOAD_PROJECTS_SUCCESS,
    payload: {
      projects,
    },
  };
}

export function loadProjectsError(errorMessage) {
  return {
    type: LOAD_PROJECTS_ERROR,
    payload: {
      errorMessage,
    },
  };
}

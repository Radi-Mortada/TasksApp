/*
 *
 * ProjectCreatorForm actions
 *
 */

import {
  CREATE_PROJECT_INVOKED,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR,
} from './constants';

export function createProjectInvoked(formValues) {
  return {
    type: CREATE_PROJECT_INVOKED,
    payload: {
      formValues,
    },
  };
}

export function createProjectSuccess(user) {
  return {
    type: CREATE_PROJECT_SUCCESS,
    payload: {
      user,
    },
  };
}

export function createProjectError(errorMessage) {
  return {
    type: CREATE_PROJECT_ERROR,
    payload: {
      errorMessage,
    },
  };
}

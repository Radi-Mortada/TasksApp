/*
 *
 * TaskCreatorForm actions
 *
 */

import {
  CREATE_TASK_INVOKED,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
} from './constants';

export function createTaskInvoked(formValues) {
  return {
    type: CREATE_TASK_INVOKED,
    payload: {
      formValues,
    },
  };
}

export function createTaskSuccess(user) {
  return {
    type: CREATE_TASK_SUCCESS,
    payload: {
      user,
    },
  };
}

export function createTaskError(errorMessage) {
  return {
    type: CREATE_TASK_ERROR,
    payload: {
      errorMessage,
    },
  };
}

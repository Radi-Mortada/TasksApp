/*
 *
 * TaskPage actions
 *
 */

import {
  LOAD_TASK_INVOKED,
  LOAD_TASK_SUCCESS,
  LOAD_TASK_ERROR,
} from './constants';

export function loadTaskInvoked(taskId) {
  return {
    type: LOAD_TASK_INVOKED,
    payload: {
      taskId,
    },
  };
}

export function loadTaskSuccess(task, userCanEditTask) {
  return {
    type: LOAD_TASK_SUCCESS,
    payload: {
      task,
      userCanEditTask,
    },
  };
}

export function loadTaskError(errorMessage) {
  return {
    type: LOAD_TASK_ERROR,
    payload: {
      errorMessage,
    },
  };
}

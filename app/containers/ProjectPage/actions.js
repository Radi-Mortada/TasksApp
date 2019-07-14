/*
 *
 * ProjectPage actions
 *
 */

import {
  LOAD_TASKS_INVOKED,
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_ERROR,
} from './constants';

export function loadTasksInvoked(projectId) {
  return {
    type: LOAD_TASKS_INVOKED,
    payload: {
      projectId,
    },
  };
}

export function loadTasksSuccess(tasks, project, isAdminUser) {
  return {
    type: LOAD_TASKS_SUCCESS,
    payload: {
      tasks,
      isAdminUser,
      project,
    },
  };
}

export function loadTasksError(errorMessage) {
  return {
    type: LOAD_TASKS_ERROR,
    payload: {
      errorMessage,
    },
  };
}

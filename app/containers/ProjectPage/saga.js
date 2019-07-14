import { call, all, put, takeLatest, select } from 'redux-saga/effects';

import {
  makeSelectUser,
  makeSelectAllProjects,
} from 'containers/App/selectors';
import request, { REQUEST_URL } from 'utils/request';
import { LOAD_TASKS_INVOKED } from './constants';
import { loadTasksSuccess, loadTasksError } from './actions';

/**
 * Handles load tasks `API` request.
 */
function* loadTasks(event) {
  const {
    payload: { projectId },
  } = event;

  try {
    const tasksResponse = yield call(
      request,
      `${REQUEST_URL}/tasks?projectId=${projectId}`,
    );

    const loadedProjects = yield select(makeSelectAllProjects());
    const currentProject = loadedProjects.find(
      project => Number(project.id) === Number(projectId),
    );

    const { id: userId } = yield select(makeSelectUser());

    const isAdminUser = currentProject && currentProject.adminId === userId;

    yield put(loadTasksSuccess(tasksResponse, currentProject, isAdminUser));
  } catch (error) {
    yield put(loadTasksError(error.message));
  }
}

export default function* projectPageSaga() {
  yield all([takeLatest(LOAD_TASKS_INVOKED, loadTasks)]);
}

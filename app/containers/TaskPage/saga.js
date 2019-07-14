import { call, all, put, takeLatest, select } from 'redux-saga/effects';

import { makeSelectUser } from 'containers/App/selectors';
import { makeSelectCurrentProjectIsAdmin } from 'containers/ProjectPage/selectors';
import request, { REQUEST_URL } from 'utils/request';
import { LOAD_TASK_INVOKED } from './constants';
import { loadTaskSuccess, loadTaskError } from './actions';

/**
 * Handles load tasks `API` request.
 */
function* loadTask(event) {
  const {
    payload: { taskId },
  } = event;

  try {
    const tasksResponse = yield call(request, `${REQUEST_URL}/tasks/${taskId}`);

    const isAdmin = yield select(makeSelectCurrentProjectIsAdmin());

    const { id: userId } = yield select(makeSelectUser());

    const userCanEditTask = isAdmin || userId === tasksResponse.ownerId;

    yield put(loadTaskSuccess(tasksResponse, userCanEditTask));
  } catch (error) {
    yield put(loadTaskError(error.message));
  }
}

export default function* taskPageSaga() {
  yield all([takeLatest(LOAD_TASK_INVOKED, loadTask)]);
}

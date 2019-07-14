import { call, all, put, takeLatest, select } from 'redux-saga/effects';

import request, { REQUEST_URL } from 'utils/request';
import { makeSelectUser } from 'containers/App/selectors';
import { loadTasksInvoked } from 'containers/ProjectPage/actions';
import { CREATE_TASK_INVOKED } from './constants';
import { createTaskSuccess, createTaskError } from './actions';

/**
 * Handles user createTask `API` request.
 */
function* handleCreateTaskInvoked(event) {
  const {
    payload: { formValues },
  } = event;

  const { id: taskId, projectId } = formValues;

  try {
    const { id } = yield select(makeSelectUser());

    const body = {
      ownerId: id,
      ...formValues,
    };

    const requestOptions = {
      method: taskId ? 'PUT' : 'POST',
      body: JSON.stringify(body),
    };

    const createTaskResponse = yield call(
      request,
      `${REQUEST_URL}/tasks${taskId ? `/${taskId}` : ''}`,
      requestOptions,
    );

    yield put(createTaskSuccess(createTaskResponse));
    yield put(loadTasksInvoked(projectId));
  } catch (error) {
    yield put(createTaskError(error.message));
  }
}

export default function* taskCreatorSaga() {
  yield all([takeLatest(CREATE_TASK_INVOKED, handleCreateTaskInvoked)]);
}

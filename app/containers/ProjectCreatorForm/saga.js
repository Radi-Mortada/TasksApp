import { call, all, put, takeLatest, select } from 'redux-saga/effects';

import request, { REQUEST_URL } from 'utils/request';
import { makeSelectUser } from 'containers/App/selectors';
import { loadProjectsInvoked } from 'containers/HomePage/actions';
import { CREATE_PROJECT_INVOKED } from './constants';
import { createProjectSuccess, createProjectError } from './actions';

/**
 * Handles user createProject `API` request.
 */
function* handleCreateProjectInvoked(event) {
  const {
    payload: { formValues },
  } = event;

  const { id: projectId } = formValues;

  try {
    const { id } = yield select(makeSelectUser());

    const body = {
      adminId: id,
      ...formValues,
    };

    const requestOptions = {
      method: projectId ? 'PUT' : 'POST',
      body: JSON.stringify(body),
    };

    const createProjectResponse = yield call(
      request,
      `${REQUEST_URL}/projects${projectId ? `/${projectId}` : ''}`,
      requestOptions,
    );

    yield put(createProjectSuccess(createProjectResponse));
    yield put(loadProjectsInvoked());
  } catch (error) {
    yield put(createProjectError(error.message));
  }
}

export default function* projectCreatorSaga() {
  yield all([takeLatest(CREATE_PROJECT_INVOKED, handleCreateProjectInvoked)]);
}

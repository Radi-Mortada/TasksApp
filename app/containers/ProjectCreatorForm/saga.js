import { call, all, put, takeLatest, select } from 'redux-saga/effects';

import request, { REQUEST_URL } from 'utils/request';
import { makeSelectUser } from 'containers/App/selectors';
import { loadProjectsInvoked } from 'containers/HomePage/actions';
import { CREATE_PROJECT_INVOKED } from './constants';
import { createProjectSuccess, createProjectError } from './actions';

/**
 * Handles user createProject `API` request.
 * @typedef {{email: string, password: string}} Payload
 * @typedef {{payload: Payload, type: string}} Event
 * @param {Event} event
 */
function* handleCreateProjectInvoked(event) {
  const {
    payload: { name },
  } = event;

  try {
    const { id } = yield select(makeSelectUser());

    const body = {
      adminId: id,
      name,
    };

    const requestOptions = { method: 'POST', body: JSON.stringify(body) };

    const createProjectResponse = yield call(
      request,
      `${REQUEST_URL}/projects`,
      requestOptions,
    );

    yield put(createProjectSuccess(createProjectResponse));
    yield put(loadProjectsInvoked());
  } catch (error) {
    yield put(createProjectError(error.message));
  }
}

export default function* loginFormSaga() {
  yield all([takeLatest(CREATE_PROJECT_INVOKED, handleCreateProjectInvoked)]);
}

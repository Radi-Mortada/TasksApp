import { call, all, put, takeLatest } from 'redux-saga/effects';

import request, { REQUEST_URL } from 'utils/request';
import { LOAD_PROJECTS_INVOKED } from './constants';
import { loadProjectsSuccess, loadProjectsError } from './actions';

/**
 * Handles load projects `API` request.
 * @typedef {{email: string, password: string}} Payload
 * @typedef {{payload: Payload, type: string}} Event
 * @param {Event} event
 */
function* loadProjects() {
  try {
    const projectsResponse = yield call(request, `${REQUEST_URL}/projects`);

    yield put(loadProjectsSuccess(projectsResponse));
  } catch (error) {
    yield put(loadProjectsError(error.message));
  }
}

export default function* homePageSaga() {
  yield all([takeLatest(LOAD_PROJECTS_INVOKED, loadProjects)]);
}

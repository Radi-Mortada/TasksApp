import { call, all, put, takeLatest } from 'redux-saga/effects';

import request, { REQUEST_URL } from 'utils/request';
import { LOGIN_INVOKED } from './constants';
import { loginSuccess, loginError } from './actions';

/**
 * Handles user login `API` request.
 * @typedef {{email: string, password: string}} Payload
 * @typedef {{payload: Payload, type: string}} Event
 * @param {Object} routerHistory
 * @param {Event} event
 */
function* handleLoginInvoked(routerHistory, event) {
  const { payload } = event;

  try {
    const requestOptions = { method: 'POST', body: JSON.stringify(payload) };

    const loginResponse = yield call(
      request,
      `${REQUEST_URL}/login`,
      requestOptions,
    );

    yield put(loginSuccess(loginResponse));
    routerHistory.push('/');
  } catch (error) {
    yield put(loginError(error.message));
  }
}

export default function* loginFormSaga(routerHistory) {
  const boundedHandleLoginInvoked = handleLoginInvoked.bind(
    null,
    routerHistory,
  );

  yield all([takeLatest(LOGIN_INVOKED, boundedHandleLoginInvoked)]);
}

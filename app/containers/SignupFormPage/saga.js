import { call, all, put, takeLatest } from 'redux-saga/effects';

import request, { REQUEST_URL } from 'utils/request';
import { SIGNUP_INVOKED } from './constants';
import { signupSuccess, signupError } from './actions';

/**
 * Handles user signup `API` request.
 * @typedef {{email: string, password: string}} Payload
 * @typedef {{payload: Payload, type: string}} Event
 * @param {Event} event
 */
function* handleLoginInvoked(event) {
  const { payload } = event;

  try {
    const requestOptions = { method: 'POST', body: JSON.stringify(payload) };

    const signupResponse = yield call(
      request,
      `${REQUEST_URL}/users`,
      requestOptions,
    );

    yield put(signupSuccess(signupResponse));
  } catch (error) {
    yield put(signupError(error.message));
  }
}

export default function* signupFormSaga() {
  yield all([takeLatest(SIGNUP_INVOKED, handleLoginInvoked)]);
}

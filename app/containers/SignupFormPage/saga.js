import { call, all, put, takeLatest } from 'redux-saga/effects';

import request, { REQUEST_URL } from 'utils/request';
import { SIGNUP_INVOKED } from './constants';
import { signupSuccess, signupError } from './actions';

/**
 * Handles user signup `API` request.
 * @typedef {{email: string, password: string}} Payload
 * @typedef {{payload: Payload, type: string}} Event
 * @param {Object} routerHistory
 * @param {Event} event
 */
function* handleSignupInvoked(routerHistory, event) {
  const { payload } = event;

  try {
    const requestOptions = { method: 'POST', body: JSON.stringify(payload) };

    const signupResponse = yield call(
      request,
      `${REQUEST_URL}/users`,
      requestOptions,
    );

    yield put(signupSuccess(signupResponse));
    routerHistory.push('/');
  } catch (error) {
    yield put(signupError(error.message));
  }
}

export default function* signupFormSaga(routerHistory) {
  const boundedHandleSignupInvoked = handleSignupInvoked.bind(
    null,
    routerHistory,
  );

  yield all([takeLatest(SIGNUP_INVOKED, boundedHandleSignupInvoked)]);
}

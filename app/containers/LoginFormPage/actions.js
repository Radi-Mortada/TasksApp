/*
 *
 * LoginFormPage actions
 *
 */

import { LOGIN_INVOKED, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

export function loginInvoked(email, password) {
  return {
    type: LOGIN_INVOKED,
    payload: {
      email,
      password,
    },
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user,
    },
  };
}

export function loginError(errorMessage) {
  return {
    type: LOGIN_ERROR,
    payload: {
      errorMessage,
    },
  };
}

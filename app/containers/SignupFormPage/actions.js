/*
 *
 * SignupFormPage actions
 *
 */

import { SIGNUP_INVOKED, SIGNUP_SUCCESS, SIGNUP_ERROR } from './constants';

export function signupInvoked(email, password) {
  return {
    type: SIGNUP_INVOKED,
    payload: {
      email,
      password,
    },
  };
}

export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    payload: {
      user,
    },
  };
}

export function signupError(errorMessage) {
  return {
    type: SIGNUP_ERROR,
    payload: {
      errorMessage,
    },
  };
}

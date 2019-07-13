/*
 *
 * LoginFormPage reducer
 *
 */
import produce from 'immer';
import { LOGIN_INVOKED, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

export const initialState = {
  isLoading: false,
  errorMessage: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const loginFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_INVOKED: {
        draft.isLoading = true;

        return draft;
      }
      case LOGIN_SUCCESS: {
        draft.isLoading = false;
        draft.errorMessage = undefined;

        return draft;
      }
      case LOGIN_ERROR: {
        const {
          payload: { errorMessage },
        } = action;

        draft.isLoading = false;
        draft.errorMessage = errorMessage;

        return draft;
      }
      default:
        return state;
    }
  });

export default loginFormReducer;

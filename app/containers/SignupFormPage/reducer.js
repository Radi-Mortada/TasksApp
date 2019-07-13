/*
 *
 * LoginFormPage reducer
 *
 */
import produce from 'immer';
import { SIGNUP_INVOKED, SIGNUP_SUCCESS, SIGNUP_ERROR } from './constants';

export const initialState = {
  isLoading: false,
  errorMessage: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const loginFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SIGNUP_INVOKED: {
        draft.isLoading = true;

        return draft;
      }
      case SIGNUP_SUCCESS: {
        draft.isLoading = false;
        draft.errorMessage = undefined;

        return draft;
      }
      case SIGNUP_ERROR: {
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

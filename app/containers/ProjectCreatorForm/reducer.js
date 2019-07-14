/*
 *
 * ProjectCreatorForm reducer
 *
 */
import produce from 'immer';
import {
  CREATE_PROJECT_INVOKED,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR,
} from './constants';

export const initialState = {
  isLoading: false,
  errorMessage: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const loginFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_PROJECT_INVOKED: {
        draft.isLoading = true;

        return draft;
      }
      case CREATE_PROJECT_SUCCESS: {
        draft.isLoading = false;
        draft.errorMessage = undefined;

        return draft;
      }
      case CREATE_PROJECT_ERROR: {
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

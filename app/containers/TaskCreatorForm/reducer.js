/*
 *
 * TaskCreatorForm reducer
 *
 */
import produce from 'immer';
import {
  CREATE_TASK_INVOKED,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
} from './constants';

export const initialState = {
  isLoading: false,
  errorMessage: undefined,
  isUpdated: false,
};

/* eslint-disable default-case, no-param-reassign */
const taskCreatorReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_TASK_INVOKED: {
        draft.isLoading = true;
        draft.isUpdated = false;

        return draft;
      }
      case CREATE_TASK_SUCCESS: {
        draft.isLoading = false;
        draft.errorMessage = undefined;
        draft.isUpdated = true;

        return draft;
      }
      case CREATE_TASK_ERROR: {
        const {
          payload: { errorMessage },
        } = action;

        draft.isLoading = false;
        draft.errorMessage = errorMessage;
        draft.isUpdated = false;

        return draft;
      }
      default:
        return state;
    }
  });

export default taskCreatorReducer;

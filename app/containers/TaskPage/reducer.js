/*
 *
 * TaskPage reducer
 *
 */
import produce from 'immer';
import {
  LOAD_TASK_INVOKED,
  LOAD_TASK_SUCCESS,
  LOAD_TASK_ERROR,
} from './constants';

export const initialState = {
  isLoading: false,
  errorMessage: '',
  task: undefined,
  userCanEditTask: false,
  info: {
    isLoaded: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const taskPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TASK_INVOKED: {
        draft.isLoading = true;
        draft.userCanEditTask = false;

        return draft;
      }
      case LOAD_TASK_SUCCESS: {
        const {
          payload: { task, userCanEditTask },
        } = action;
        draft.isLoading = false;
        draft.errorMessage = undefined;

        draft.info.isLoaded = true;
        draft.task = task;
        draft.userCanEditTask = userCanEditTask;

        return draft;
      }
      case LOAD_TASK_ERROR: {
        const {
          payload: { errorMessage },
        } = action;

        draft.isLoading = false;
        draft.errorMessage = errorMessage;
        draft.info.isLoaded = true;
        draft.userCanEditTask = false;

        return draft;
      }
      default:
        return state;
    }
  });

export default taskPageReducer;

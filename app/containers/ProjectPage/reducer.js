/*
 *
 * ProjectPage reducer
 *
 */
import produce from 'immer';
import {
  LOAD_TASKS_INVOKED,
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_ERROR,
} from './constants';

export const initialState = {
  isLoading: false,
  errorMessage: '',
  project: undefined,
  tasks: {
    info: {
      isLoaded: false,
      isAdmin: false,
    },
    data: undefined,
  },
};

/* eslint-disable default-case, no-param-reassign */
const projectPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TASKS_INVOKED: {
        draft.isLoading = true;

        return draft;
      }
      case LOAD_TASKS_SUCCESS: {
        const {
          payload: { tasks, isAdminUser, project },
        } = action;
        draft.isLoading = false;
        draft.errorMessage = undefined;
        draft.tasks.data = tasks;
        draft.tasks.info.isLoaded = true;
        draft.tasks.info.isAdmin = isAdminUser;
        draft.project = project;

        return draft;
      }
      case LOAD_TASKS_ERROR: {
        const {
          payload: { errorMessage },
        } = action;

        draft.isLoading = false;
        draft.errorMessage = errorMessage;
        draft.tasks.info.isLoaded = true;

        return draft;
      }
      default:
        return state;
    }
  });

export default projectPageReducer;

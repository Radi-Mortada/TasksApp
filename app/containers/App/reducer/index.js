/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import { combineReducers } from 'redux';
import { LOGIN_SUCCESS } from 'containers/LoginFormPage/constants';

export const userInitialState = {
  info: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = userInitialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_SUCCESS: {
        const {
          payload: { user },
        } = action;
        draft.info = user;
        return draft;
      }
      default:
        return state;
    }
  });

export default combineReducers({
  user: userReducer,
});

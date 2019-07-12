/*
 *
 * App reducers
 *
 */
import produce from 'immer';
import { combineReducers } from 'redux';
import { LOGIN_SUCCESS } from 'containers/LoginForm/constants';

export const userInitialState = {
  user: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = userInitialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_SUCCESS: {
        const {
          payload: { user },
        } = action;
        draft.user = user;
        return draft;
      }
      default:
        return state;
    }
  });

export default combineReducers({
  user: userReducer,
});

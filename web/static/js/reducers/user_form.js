import { combineReducers } from 'redux';
import { handleAction, handleActions } from 'redux-actions';
import { associate, DELETE } from 'associative-reducer';

const userForm = associate(handleActions({
  ADD_USER_FORM: (state = { query: '', suggestedUsers: [], selectedUser: null }, action) => {
    const { query, suggestedUsers, selectedUser } = state;
    return {
      query, suggestedUsers, selectedUser
    };
  },
  UPDATE_USER_FORM_QUERY: (state, { payload: { value }}) => {
    return Object.assign({}, state, {
      query: value
    });
  },
  UPDATE_USER_FORM_SELECTED: (state, { payload }) => {
    return Object.assign({}, state, {
      selectedUser: payload
    });
  },
  RECEIVE_USER_SUGGESTIONS: (state, { payload: { users }}) => {
    return Object.assign({}, state, {
      suggestedUsers: users
    });
  },
  UNMOUNT_USER_FORM: (state, action) => DELETE
}), 'ADD_USER_FORM')

export default userForm

import { combineReducers } from 'redux';
import { handleAction, handleActions } from 'redux-actions';
import { associate, DELETE } from 'associative-reducer';

import {
  addUserForm, updateUserFormSelected, updateUserFormQuery,
  receiveSuggestedUsers, unmountUserForm
} from 'actions/user_form'

const userForm = associate(handleActions({
  [addUserForm]: (state, action) => {
    const { query, suggestedUsers, selectedUser } = state;
    return {
      query, suggestedUsers, selectedUser
    };
  },
  [updateUserFormQuery]: (state, { payload: { value }}) => {
    return Object.assign({}, state, {
      query: value
    });
  },
  [updateUserFormSelected]: (state, { payload }) => {
    return Object.assign({}, state, {
      selectedUser: payload
    });
  },
  [receiveSuggestedUsers]: (state, { payload: { users }}) => {
    return Object.assign({}, state, {
      suggestedUsers: users
    });
  },
  [unmountUserForm]: (state, action) => DELETE
}, { query: '', suggestedUsers: [], selectedUser: null }), addUserForm.toString())

export default userForm

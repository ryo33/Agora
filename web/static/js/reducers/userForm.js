import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { associate, DELETE } from 'associative-reducer'

import {
  addUserForm, updateUserFormSelected, updateUserFormQuery,
  receiveSuggestedUsers, resetUserForm, unmountUserForm,
} from 'actions/userForm'

const userForm = associate(createReducer({
  [addUserForm]: (state, action) => {
    const { query = '', suggestedUsers = [], selectedUser = null } = state
    return {
      query, suggestedUsers, selectedUser,
    }
  },
  [resetUserForm]: () => {
    return {
      query: '', suggestedUsers: [], selectedUser: null,
    }
  },
  [updateUserFormQuery]: (state, value) => {
    return Object.assign({}, state, {
      query: value,
    })
  },
  [updateUserFormSelected]: (state, payload) => {
    return Object.assign({}, state, {
      selectedUser: payload,
    })
  },
  [receiveSuggestedUsers]: (state, users) => {
    return Object.assign({}, state, {
      suggestedUsers: users,
    })
  },
  [unmountUserForm]: (state, action) => DELETE,
}, { query: '', suggestedUsers: [], selectedUser: null }),
  addUserForm.toString()
)

export default userForm

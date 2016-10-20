import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'

import { updateNewUserFormQuery, receiveSuggestedUserExists } from 'actions/accountPage/newUserForm'

const newUserForm = createReducer({
  [updateNewUserFormQuery]: (state, { value }) => {
    return Object.assign({}, state, {
      query: value,
    })
  },
  [receiveSuggestedUserExists]: (state, exists) => {
    return Object.assign({}, state, {
      suggestedUserExists: exists,
    })
  },
}, {
  suggestedUserExists: false,
})

export default newUserForm

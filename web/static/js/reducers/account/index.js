import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';

import addUser from './add_user';
import { updateAccountUsers, addAccountUser, updateCurrentUser } from 'actions/accountPage';

const users = createReducer({
  [updateAccountUsers]: (state, ids) => ids,
  [addAccountUser]: (state, id) => state.concat(id)
}, []);

const currentUser = createReducer({
  [updateCurrentUser]: (state, id) => id
}, null);

const account = combineReducers({
  forms: combineReducers({
    addUser,
  }),
  users,
  currentUser
});

export default account;

import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';

import addUser from './add_user';
import { updateAccountUsers, addAccountUser, updateCurrentUser, updateWatchlists } from 'actions/accountPage';

const users = createReducer({
  [updateAccountUsers]: (state, ids) => ids,
  [addAccountUser]: (state, id) => state.concat(id)
}, []);

const watchlists = createReducer({
  [updateWatchlists]: (_, ids) => ids
}, []);

const currentUser = createReducer({
  [updateCurrentUser]: (state, id) => id
}, null);

const account = combineReducers({
  forms: combineReducers({
    addUser,
  }),
  users,
  watchlists,
  currentUser
});

export default account;

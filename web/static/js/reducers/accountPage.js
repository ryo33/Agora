import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';

import {
  openAccountThreadsPage, updateThreads,
    openAccountGroupsPage, updateGroups
} from 'actions/accountPage'

const threads = createReducer({
  [updateThreads]: (_, ids) => ids
}, []);

const groups = createReducer({
  [updateGroups]: (_, ids) => ids
}, []);

const accountPage = combineReducers({
  threads,
  groups
});

export default accountPage;

import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';

import {
  updateCurrentThread,
  updateThreadPosts,
  updateThreadMembers,
  openAllThreadsPage,
  updateThreads,
  updateThreadUser
} from 'actions/threadPage'

const currentThread = createReducer({
  [updateCurrentThread]: (_, id) => id
}, null);

const posts = createReducer({
  [updateCurrentThread]: (_, payload) => [],
  [updateThreadPosts]: (_, ids) => ids
}, []);

const members = createReducer({
  [updateCurrentThread]: (_, payload) => [],
  [updateThreadMembers]: (_, ids) => ids
}, []);

const user = createReducer({
  [updateThreadUser]: (_, payload) => payload
}, null);

const threads = createReducer({
  [updateThreads]: (_, ids) => ids
}, []);

const threadPage = combineReducers({
  currentThread,
  posts,
  members,
  threads,
  user
});

export default threadPage;

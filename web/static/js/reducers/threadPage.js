import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';

import {
  updateCurrentThread,
    updateThreadPosts,
    openAllThreadsPage,
    updateThreads
} from 'actions/threadPage'

const currentThread = createReducer({
  [updateCurrentThread]: (_, id) => id
}, null);

const posts = createReducer({
  [updateCurrentThread]: (_, payload) => [],
  [updateThreadPosts]: (_, ids) => ids
}, []);

const threads = createReducer({
  [updateThreads]: (_, ids) => ids
}, []);

const threadPage = combineReducers({
  currentThread,
  posts,
  threads
});

export default threadPage;

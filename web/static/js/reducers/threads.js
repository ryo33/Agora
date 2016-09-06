import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import Immutable, { Map } from 'immutable';

import {
  updateCurrentThread,
  updateThreadContents,
  addThreadContents,
  requestThreadContents
} from 'actions/threads'

const currentThread = handleActions({
  [updateCurrentThread]: (_, { payload: { id } }) => id
}, null)

const threads = handleActions({
  [updateThreadContents]: (state, { payload: { id, info, postsMap, postsList } }) => {
    return Object.assign({}, state, {
      [id]: Object.assign({}, state[id] || {}, {
        title: info.title,
        parentGroup: info.parentGroup,
        user: info.user,
        postsMap: postsMap,
        postsList: postsList,
        insertedAt: info.inserted_at
      })
    });
  },
  [addThreadContents]: (state, { payload: { id, postsMap, postsList } }) => {
    const thread = state[id] || {}
    return Object.assign({}, state, {
      [id]: Object.assign({}, thread, {
        postsMap: Object.assign({}, thread.postsMap, postsMap),
        postsList: postsList
      })
    });
  },
}, {});

const isFetchingThreadContents = handleActions({
  [requestThreadContents]: (state, { payload: id }) => {
    return Object.assign({}, state, { [id]: true })
  },
  [addThreadContents]: (state, { payload: { id } }) => {
    return Object.assign({}, state, { [id]: false })
  },
  [updateThreadContents]: (state, { payload: { id } }) => {
    return Object.assign({}, state, { [id]: false })
  },
}, {});

function isFetchingMissingPosts(state = {}, action) {
  switch (action.type) {
    case 'REQUEST_MISSING_POSTS':
      return Object.assign({}, state, Map().set(action.id, true).toJS());
    case 'RECEIVE_MISSING_POSTS':
      return Object.assign({}, state, Map().set(action.id, false).toJS());
    default:
      return state;
  }
}

const threadsRoot = combineReducers({
  currentThread, // id
  threads, // id => map
  isFetchingThreadContents, // id => bool
  isFetchingMissingPosts, // id => bool
});

export default threadsRoot;

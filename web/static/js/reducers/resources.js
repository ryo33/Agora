import { createReducer } from 'redux-act';

import {
  addGroups, updateGroup,
    addThreads, updateThread,
    addPosts, updatePost,
    addUsers, updateUser,
    addWatchlists, updateWatchlist
} from 'actions/resources'

function updateItem(resources, id, newInfo) {
  console.log(resources)
  console.log(id)
  console.log(newInfo)
  return Object.assign({}, resources, {
    [id]: Object.assign({}, resources[id], newInfo)
  });
}

function createResourceReducer(add, update) {
  return createReducer({
    [add]: (state, resources) => Object.assign({}, state, resources),
    [update]: (state, { id, resource }) => updateItem(state, id, resource),
  }, {});
}

export const groups  = createResourceReducer(addGroups, updateGroup);
export const threads = createResourceReducer(addThreads, updateThread);
export const posts   = createResourceReducer(addPosts, updatePost);
export const users   = createResourceReducer(addUsers, updateUser);
export const watchlists   = createResourceReducer(addWatchlists, updateWatchlist);

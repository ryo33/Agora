import { createReducer } from 'redux-act'

import {
  addGroups, updateGroup,
  addThreads, updateThread,
  addPosts, updatePost,
  addUsers, updateUser,
  addWatchlists, updateWatchlist,
  addWebhooks, updateWebhook,
  addUserIDs,
} from 'actions/resources'

function updateItem(resources, id, newInfo) {
  if (resources[id] != null) {
    return Object.assign({}, resources, {
      [id]: Object.assign({}, resources[id], newInfo),
    })
  } else {
    return resources
  }
}

function createResourceReducer(add, update) {
  return createReducer({
    [add]: (state, resources) => Object.assign({}, state, resources),
    [update]: (state, { id, resource }) => updateItem(state, id, resource),
  }, {})
}

export const groups = createResourceReducer(addGroups, updateGroup)
export const threads = createResourceReducer(addThreads, updateThread)
export const posts = createResourceReducer(addPosts, updatePost)
export const users = createResourceReducer(addUsers, updateUser)
export const watchlists = createResourceReducer(addWatchlists, updateWatchlist)
export const webhooks = createResourceReducer(addWebhooks, updateWebhook)

export const userIDs = createReducer({
  [addUserIDs]: (state, ids) => Object.assign({}, state, ids),
}, {})

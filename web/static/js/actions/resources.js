import { createAction } from 'redux-act'

function createAddFor(resource) {
  return createAction(`Add ${resource}`, resources => resources)
}
function createPrepareFor(resource) {
  return createAction(`Prepare ${resource}`, ids => ids)
}
function createFetchFor(resource) {
  return createAction(`Fetch ${resource}`, ids => ids)
}
function createUpdateFor(resource) {
  return createAction(`Update ${resource}`, (id, resource) => ({ id, resource }))
}
function createSubmitFor(resource) {
  return createAction(`Submit a ${resource}`, params => params)
}
function createDeleteFor(resource) {
  return createAction(`Delete the ${resource}`, id => id)
}
function createEditFor(resource) {
  return createAction(`Edit the ${resource}`, (id, params) => ({ id, params }))
}
function createWatchFor(resource) {
  return createAction(`Watch the ${resource}`, (watchlist, id) => ({ watchlist, [resource]: id }))
}
function createUnwatchFor(resource) {
  return createAction(`Unwatch the ${resource}`, (watchlist, id) => ({ watchlist, [resource]: id }))
}

export const addGroups = createAddFor('groups')
export const addThreads = createAddFor('threads')
export const addPosts = createAddFor('posts')
export const addUsers = createAddFor('users')
export const addWatchlists = createAddFor('watchlists')
export const addWebhooks = createAddFor('webhooks')

export const prepareGroups = createPrepareFor('groups')
export const prepareThreads = createPrepareFor('threads')
export const preparePosts = createPrepareFor('posts')
export const prepareUsers = createPrepareFor('users')
export const prepareWatchlists = createPrepareFor('watchlists')
export const prepareWebhooks = createPrepareFor('webhooks')

export const updateGroup = createUpdateFor('group')
export const updateThread = createUpdateFor('thread')
export const updatePost = createUpdateFor('post')
export const updateUser = createUpdateFor('user')
export const updateWatchlist = createUpdateFor('watchlist')
export const updateWebhook = createUpdateFor('webhook')

export const submitGroup = createSubmitFor('group')
export const submitThread = createSubmitFor('thread')
export const submitPost = createSubmitFor('post')
export const submitWatchlist = createSubmitFor('watchlist')
export const submitUser = createSubmitFor('user')
export const submitWebhook = createSubmitFor('webhook')
export const submitWebhookLink = createSubmitFor('webhook link')

export const deleteWebhook = createDeleteFor('webhook')
export const deleteWebhookLink = createAction('Delete the webhook link', (thread, user) => ({ thread, user }))

export const editGroup = createEditFor('group')
export const editThread = createEditFor('thread')
export const editWatchlist = createEditFor('watchlist')
export const editWebhook = createEditFor('webhook')

export const watchGroup = createWatchFor('group')
export const watchThread = createWatchFor('thread')

export const unwatchGroup = createUnwatchFor('group')
export const unwatchThread = createUnwatchFor('thread')

export const addUserIDs = createAction('Add User IDs', ids => ids)

import { createAction } from 'redux-act';

function createAddFor(resource) {
  return createAction(`Add ${resource}`, resources => resources);
}
function createPrepareFor(resource) {
  return createAction(`Prepare ${resource}`, ids => ids);
}
function createUpdateFor(resource) {
  return createAction(`Update ${resource}`, (id, resource) => ({ id, resource }));
}
function createSubmitFor(resource) {
  return createAction(`Submit a ${resource}`, params => params);
}
function createWatchFor(resource) {
  return createAction(`Watch the ${resource}`, (watchlist, id) => ({ watchlist, [resource]: id }));
}

export const addGroups  = createAddFor('groups');
export const addThreads = createAddFor('threads');
export const addPosts   = createAddFor('posts');
export const addUsers   = createAddFor('users');
export const addWatchlists   = createAddFor('watchlists');

export const prepareGroups  = createPrepareFor('groups');
export const prepareThreads = createPrepareFor('threads');
export const preparePosts   = createPrepareFor('posts');
export const prepareUsers   = createPrepareFor('users');
export const prepareWatchlists   = createPrepareFor('watchlists');

export const updateGroup  = createUpdateFor('group');
export const updateThread = createUpdateFor('thread');
export const updatePost   = createUpdateFor('post');
export const updateUser   = createUpdateFor('user');
export const updateWatchlist   = createUpdateFor('watchlist');

export const submitGroup = createSubmitFor('group');
export const submitThread = createSubmitFor('thread');
export const submitPost = createSubmitFor('post');
export const submitWatchlist = createSubmitFor('watchlist');

export const watchGroup = createWatchFor('group');
export const watchThread = createWatchFor('thread');

import { createAction } from 'redux-act';

function createAddFor(resource) {
  return createAction(`Add ${resource}`, resources => resources);
}
function createPrepareFor(resource) {
  return createAction(`Prepare ${resource}`, ids => ids);
}
function createUpdateFor(resource) {
  return createAction(`Update ${resource}`, (id, resource) => { id, resource });
}

export const addGroups  = createAddFor('groups');
export const addThreads = createAddFor('threads');
export const addPosts   = createAddFor('posts');
export const addUsers   = createAddFor('users');

export const prepareGroups  = createPrepareFor('groups');
export const prepareThreads = createPrepareFor('threads');
export const preparePosts   = createPrepareFor('posts');
export const prepareUsers   = createPrepareFor('users');

export const updateGroups  = createUpdateFor('groups');
export const updateThreads = createUpdateFor('threads');
export const updatePosts   = createUpdateFor('posts');
export const updateUsers   = createUpdateFor('users');

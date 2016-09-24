import { createAction } from 'redux-act';

export const updateCurrentThread = createAction('Update current thread', id => id);
export const openThreadPage = createAction('Open thread page', id => id);
export const closeThreadPage = createAction('Close thread page');

export const updateThreadPosts = createAction('Update thread posts', ids => ids);
export const updateThreadMembers = createAction('Update thread members', ids => ids);

export const openAllThreadsPage = createAction('Open all threads page');
export const updateThreads = createAction('Update threads');

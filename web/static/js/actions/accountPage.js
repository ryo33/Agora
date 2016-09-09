import { createAction } from 'redux-act';

export const updateCurrentUser = createAction('Update current user', id => id);
export const updateAccountUsers = createAction('Update account users', ids => ids);
export const addAccountUser = createAction('Add account user', id => id);

export const addThread = createAction('Add thread',
  (user, title) => ({ user, title }));
export const addGroup = createAction('Add group',
  (user, name) => ({ user, name }));

export const openAccountThreadsPage = createAction('Open account threads page');
export const updateThreads = createAction('Update account threads');

export const openAccountGroupsPage = createAction('Open account groups page');
export const updateGroups = createAction('Update account groups');

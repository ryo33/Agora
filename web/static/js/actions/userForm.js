import { createAction } from 'redux-act';
import { associate } from 'associative-reducer';

export const addUserForm = associate(createAction('Add user form'));
export const receiveSuggestedUsers = associate(createAction('Receive suggested users', users => users));
export const updateUserFormQuery = associate(createAction('Update user form query',
  (value, groupID) => ({ value, groupID })));
export const updateUserFormSelected = associate(createAction('Update user form selected', value => value));
export const unmountUserForm = associate(createAction('Unmount user form'));

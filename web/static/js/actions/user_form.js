import { createAction } from 'redux-actions';

export const addUserForm = createAction('ADD_USER_FORM');
export const receiveSuggestedUsers = createAction('RECEIVE_USER_SUGGESTIONS', users => ({ users }));
export const updateUserFormQuery = createAction('UPDATE_USER_FORM_QUERY', (value, groupID) => ({ value, groupID }));
export const updateUserFormSelected = createAction('UPDATE_USER_FORM_SELECTED', value => value);
export const unmountUserForm = createAction('UNMOUNT_USER_FORM');

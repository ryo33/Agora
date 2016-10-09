import { createAction } from 'redux-act';

export const openAllGroupsPage = createAction('Open all groups page');
export const updateGroups = createAction('Update groups');

export const switchGroupPageTabs = createAction('Switch group page tabs', value => value)
export const updateCurrentGroup = createAction('Update current group', id => id);
export const openGroupPage = createAction('Open group page', id => id);
export const closeGroupPage = createAction('Close group page');

export const openGroupThreadsTab = createAction('Open group threads tab', id => id);
export const updateGroupThreads = createAction('Update group threads', ids => ids);

export const openGroupGroupsTab = createAction('Open group groups tab', id => id);
export const updateGroupGroups = createAction('Update group groups', ids => ids);

export const updateGroupMembers = createAction('Update group members', ids => ids);

export const addMember = createAction('Add group member',
  (group, user) => ({ group, user }));

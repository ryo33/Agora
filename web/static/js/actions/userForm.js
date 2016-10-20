import { createAction } from 'redux-act'
import { associate } from 'associative-reducer'

export const addUserForm = associate(createAction('Add user form'))
export const receiveSuggestedUsers = associate(createAction('Receive suggested users', users => users))
export const updateUserFormQuery = associate(createAction('Update user form query', value => value))
export const updateUserFormSelected = associate(createAction('Update user form selected', value => value))
export const resetUserForm = associate(createAction('Reset user form'))
export const unmountUserForm = associate(createAction('Unmount user form'))

export const requestUserSuggestions = associate(createAction('request user suggestions',
  value => ({ value })))
export const requestNewMemberSuggestions = associate(createAction('request new member suggestions',
  (value, groupID) => ({ value, groupID })))
export const requestThreadWebhookSuggestions = associate(createAction('request webhooks suggestions',
  (value, threadID) => ({ value, threadID })))

import { createAction } from 'redux-act'

export const updateCurrentUser = createAction('Update current user', id => id)
export const updateAccountUsers = createAction('Update account users', ids => ids)
export const addAccountUser = createAction('Add account user', id => id)

export const openAccountThreadsPage = createAction('Open account threads page')
export const updateThreads = createAction('Update account threads')

export const openAccountGroupsPage = createAction('Open account groups page')
export const updateGroups = createAction('Update account groups')

export const openAccountWatchlistsPage = createAction('Open account watchlists page')
export const updateWatchlists = createAction('Update account watchlists')

export const openAccountWebhooksPage = createAction('Open account webhooks page')
export const updateWebhooks = createAction('Update account webhooks')

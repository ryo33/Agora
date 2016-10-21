import { createAction } from 'redux-act'

export const updateCurrentWatchlist = createAction('Update current watchlist', id => id)
export const openWatchlistPage = createAction('Open watchlist page', id => id)
export const closeWatchlistPage = createAction('Close watchlist page')

export const openWatchlistItemsPage = createAction('Open watchlist items page', id => id)
export const closeWatchlistItemsPage = createAction('Close watchlist items page')

export const updateWatchlistItems = createAction('Update watchlist items', items => items)

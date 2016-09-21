import { createAction } from 'redux-act';

export const updateCurrentWatchlist = createAction('Update current watchlist', id => id);
export const openWatchlistPage = createAction('Open watchlist page', id => id);
export const closeWatchlistPage = createAction('Close watchlist page');

export const updateWatchlistItems = createAction('Update watchlist items', (groups, threads) => ({ groups, threads }));

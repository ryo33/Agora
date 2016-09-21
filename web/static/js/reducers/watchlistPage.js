import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';

import {
  updateCurrentWatchlist,
    updateWatchlistItems,
} from 'actions/watchlistPage'

const currentWatchlist = createReducer({
  [updateCurrentWatchlist]: (_, id) => id
}, null);

const groups = createReducer({
  [updateWatchlistItems]: (_, { groups }) => groups
}, []);

const threads = createReducer({
  [updateWatchlistItems]: (_, { threads }) => threads
}, []);

const watchlistPage = combineReducers({
  currentWatchlist,
  groups,
  threads
});

export default watchlistPage;

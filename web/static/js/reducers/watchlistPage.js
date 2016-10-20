import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';

import {
  updateCurrentWatchlist,
    updateWatchlistItems,
} from 'actions/watchlistPage'

const currentWatchlist = createReducer({
  [updateCurrentWatchlist]: (_, id) => id
}, null);

const items = createReducer({
  [updateWatchlistItems]: (_, items) => items.sort((a, b) => b.inserted_at - a.inserted_at) // desc
}, []);

const watchlistPage = combineReducers({
  currentWatchlist,
  items
});

export default watchlistPage;

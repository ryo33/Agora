import { takeEvery, takeLatest, eventChannel, END } from 'redux-saga';
import { fork, take, call, put, cancel, select } from 'redux-saga/effects';

import { socket, commonChannel, pushMessage } from 'socket';
import {
  openWatchlistPage, closeWatchlistPage, updateCurrentWatchlist,
    updateWatchlistItems
} from 'actions/watchlistPage';
import { pageSaga } from 'sagas/pages';

function joinCallback(emitter, { items }) {
  emitter(updateWatchlistItems(items));
}

function listenCallback(emitter, channel) {
  channel.on('add items', ({ items }) => {
    emitter(updateWatchlistItems(items));
  });
}

export default function*() {
  yield fork(pageSaga, 'watchlist', openWatchlistPage, closeWatchlistPage, updateCurrentWatchlist, joinCallback, listenCallback);
}

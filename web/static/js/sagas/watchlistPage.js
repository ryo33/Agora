import { takeEvery, takeLatest, eventChannel, END } from 'redux-saga';
import { fork, take, call, put, cancel, select } from 'redux-saga/effects';

import { socket, commonChannel, pushMessage } from 'socket';
import {
  openWatchlistPage, closeWatchlistPage, updateCurrentWatchlist,
    updateWatchlistItems
} from 'actions/watchlistPage';
import { pageSaga } from 'sagas/pages';

import {
  prepareGroups, prepareThreads, preparePosts, prepareUsers,
  prepareWatchlists, prepareItems
} from 'actions/resources';

function joinCallback(emitter, { groups, threads }) {
  const posts = threads.reduce((acc, posts) => {
    acc.push(...posts);
    return acc;
  }, []);
  emitter(preparePosts(posts));
  const childGroups = threads.reduce((acc, groups) => {
    acc.push(...groups);
    return acc;
  }, []);
  emitter(prepareGroups(childGroups));
  const childThreads = threads.reduce((acc, threads) => {
    acc.push(...threads);
    return acc;
  }, []);
  emitter(prepareThreads(childThreads));
  const members = threads.reduce((acc, members) => {
    acc.push(...members);
    return acc;
  }, []);
  emitter(prepareUsers(members));

  emitter(updateWatchlistItems(groups, threads));
}

function listenCallback(emitter, channel) {
  channel.on('add items', ({ items }) => {
    emitter(updateWatchlistItems(items));
  });
}

export default function*() {
  yield fork(pageSaga, 'watchlist', openWatchlistPage, closeWatchlistPage, prepareWatchlists, updateCurrentWatchlist, joinCallback, listenCallback);
}

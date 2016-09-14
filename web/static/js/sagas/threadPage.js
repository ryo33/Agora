import { takeEvery, takeLatest, eventChannel, END } from 'redux-saga';
import { fork, take, call, put, cancel, select } from 'redux-saga/effects';

import { socket, commonChannel, pushMessage } from 'socket';
import {
  openThreadPage, closeThreadPage, updateCurrentThread,
    openAllThreadsPage, updateThreads,
    updateThreadPosts
} from 'actions/threadPage';

import {
  prepareThreads, preparePosts
} from 'actions/resources';

function joinChannel(resource, id, join, listen) {
  const channel = socket.channel(resource + ':' + id, {});

  return eventChannel(emitter => {
    const actionEmitter = action => emitter({ action })
    channel.join()
      .receive('ok', resp => join(actionEmitter, resp))
      .receive('error', resp => console.log('Unable to join', resp));
    listen(actionEmitter, channel);

    return () => {
      channel.leave();
    };
  });
}

function* watchChannel(channel) {
  while (true) {
    const { action } = yield take(channel)
    if (action) {
      yield put(action);
    }
  }
}

function* joinPageSaga(resource, closePage, prepare, updateCurrent, join, listen, action) {
  let channel = null;
  let watchChannelTask = null;
  try {
    const id = action.payload;
    yield put(prepare([id]));
    yield put(updateCurrent(id));
    channel = yield call(joinChannel, resource, id, join, listen);
    watchChannelTask = yield fork(watchChannel, channel);

    yield take(closePage.getType());
  } finally {
    if (watchChannelTask !== null) {
      yield cancel(watchChannelTask);
    }
    if (channel !== null) {
      channel.close();
    }
  }
}

export function* pageSaga(resource, openPage, closePage, prepare, updateCurrent, join, listen) {
  yield fork(takeEvery, openPage.getType(), joinPageSaga,
    resource, closePage, prepare, updateCurrent, join, listen);
}

function* fetchThreadsSaga() {
  const { threads } = yield call(pushMessage, commonChannel, 'threads', 'fetch all threads');
  yield put(prepareThreads(threads));
  yield put(updateThreads(threads));
}

function* preparePostsSaga(action) {
  const ids = action.payload;
  yield put(preparePosts(ids));
}

function joinCallback(emitter, { posts }) {
  emitter(preparePosts(posts));
  emitter(updateThreadPosts(posts));
}

function listenCallback(emitter, channel) {
  channel.on('add posts', ({ posts }) => {
    emitter(updateThreadPosts(posts));
  });
}

export default function*() {
  yield fork(pageSaga, 'thread', openThreadPage, closeThreadPage, prepareThreads, updateCurrentThread, joinCallback, listenCallback);
  yield fork(takeLatest, openAllThreadsPage.getType(), fetchThreadsSaga);
  yield fork(takeEvery, updateThreadPosts.getType(), preparePostsSaga);
}

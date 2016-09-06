import { takeLatest, eventChannel, END } from 'redux-saga';
import { fork, take, call, put, cancel, select } from 'redux-saga/effects';
import { attachKey } from 'associative-reducer';

import { socket } from 'socket';

import {
  openThreadPage,
  closeThreadPage,
  updateCurrentThread,
  updateThreadContents,
  fetchThreadContents,
  requestThreadContents,
  addThreadContents,
  fetchMissingPosts
} from 'actions/threads';

function* fetchMissingPostsSaga() {
  while (true) {
    const { payload: { id, postsList, postsMap } } = yield take(`${addThreadContents}`)
    const threads = yield select(({ threads }) => threads)
    const thread = threads.threads[id] || {};
    const missingIDs = [];
    const newPostMap = Object.assign({}, postsMap, thread.postsMap)
    postsList.forEach((postID) => {
      if (!(postID in newPostMap)) {
        missingIDs.push(postID);
      }
    });
    if (missingIDs.length > 0) {
      yield put(fetchMissingPosts(missingIDs));
    }
  }
}

function receivePosts(emitter, id, thread, posts) {
  const postsMap = {};
  const postsList = [];
  posts.forEach(({ id, title, text, user, post_id, inserted_at, updated_at }) => {
    postsMap[id] = { title, text, user, post_id, inserted_at, updated_at };
    postsList.push(id);
  });
  emitter({ action: updateThreadContents(id, thread, postsMap, postsList) });
}

function joinThreadChannel(id) {
  const channel = socket.channel('thread:' + id, {});

  return eventChannel(emitter => {
    channel.join()
      .receive('ok', ({ actions }) => {
        emitter({ action: requestThreadContents(id) });
        channel.push('post', {
          action: 'fetch_thread_contents',
          params: { id },
        }).receive('ok', ({ thread, posts }) => {
          receivePosts(emitter, id, thread, posts)
        });
      })
      .receive('error', resp => console.log('Unable to join', resp));
    channel.on('add_posts', payload => {
      const { id, posts_map, posts_list } = payload;
      emitter({ action: addThreadContents(id, posts_map, posts_list) });
    });
    channel.on('dispatch', ({ actions }) => {
      actions.map(action => emitter({ action }));
    });

    return () => {
      channel.leave();
    };
  });
}

function* watchThreadChannel(channel) {
  while (true) {
    const { action } = yield take(channel)
    if (action) {
      yield put(action);
    }
  }
}

function* threadPageSaga() {
  while (true) {
    const { payload: { id } } = yield take(`${openThreadPage}`);
    yield put(updateCurrentThread(id));

    const channel = yield call(joinThreadChannel, id);
    const watchThreadChannelTask = yield fork(watchThreadChannel, channel);

    yield take(`${closeThreadPage}`);
    yield cancel(watchThreadChannelTask);
    channel.close()
  }
}

export default function* threadSaga() {
  yield fork(threadPageSaga);
  yield fork(fetchMissingPostsSaga);
}

import { fork, take, put, select, call, race, actionChannel } from 'redux-saga/effects';
import { takeEvery, channel, delay } from 'redux-saga';
import { push } from 'react-router-redux';

import { commonChannel, pushMessage, pushMessage2 } from 'socket';

import {
  addGroups, addThreads, addPosts, addUsers, addWatchlists,
  prepareGroups, prepareThreads, preparePosts, prepareUsers, prepareWatchlists,
  submitGroup, submitThread, submitPost, submitWatchlist,
  watchThread, watchGroup, addWatchGroup, addWatchThread,
  updateWatchlist
} from 'actions/resources';
import { showLoadingError } from 'actions/global';

const TIMEOUT = 1500;

function* fetchResources(resource, resultChannel, idsSet) {
  const ids = Array.from(idsSet);
  const havingResources = yield select(({ [resource]: resources }) => resources);
  const lackingIDs = ids.filter(id => ! havingResources.hasOwnProperty(id));
  if (lackingIDs.length != 0) {
    const {
      result, error, timeout
    } = yield call(pushMessage2, commonChannel, resource, 'fetch', lackingIDs);
    if (result) {
      const lackingResources = result[resource];
      if (lackingResources.length != 0) {
        resultChannel.put({ resources: lackingResources });
      }
    } else if (timeout) {
      resultChannel.put({ timeout: true });
    } else {
      resultChannel.put({ error });
    }
  }
}

function createWatcherFor(resource, prepare, add) {
  return function*() {
    let fetchingIDs = new Set();
    let waitingIDs = new Set();
    let fetchingTask = false;
    let countDown = TIMEOUT;
    let lastTime = Date.now();
    const resultChannel = channel();
    const resourceChannel = yield actionChannel(prepare.getType());

    function swapIDs() {
      const tmp = fetchingIDs;
      fetchingIDs = waitingIDs;
      waitingIDs = tmp;
      waitingIDs.clear();
    }

    function* fetch() {
      for(const id of waitingIDs.values()) {
        fetchingIDs.add(id);
      }
      waitingIDs.clear();
      if (fetchingIDs.size != 0) {
        countDown = TIMEOUT;
        fetchingTask = yield fork(fetchResources, resource, resultChannel, fetchingIDs);
      }
    }

    while (true) {
      const now = Date.now();
      countDown -= (now - lastTime);
      lastTime = now;
      let res;
      if (fetchingTask) {
        res = yield race({
          result: take(resultChannel),
          fetchingAction: take(resourceChannel),
          timeout: call(delay, countDown)
        });
      } else {
        const action = yield take(resourceChannel);
        res = { fetchingAction: action };
      }
      const { result, fetchingAction, timeout } = res;

      if (timeout) {
        if (!fetchingTask) {
          yield* fetch();
        }
      } else if (result) {
        const { resources, timeout, error } = result;
        fetchingTask = null;
        if (resources) {
          swapIDs();
          yield* fetch();
          yield put(add(resources));
        } else if (timeout) {
          yield* fetch();
        } else {
          yield put(showLoadingError(error));
        }
      } else { // fetchingAction
        const ids = fetchingAction.payload;
        if (ids.length != 0) {
          if (fetchingTask) {
            ids.forEach(id => {
              if (!fetchingIDs.has(id)) { waitingIDs.add(id); }
            });
          } else {
            ids.forEach(id => {
              fetchingIDs.add(id);
            });
            yield* fetch();
          }
        }
      }
    }
  }
}

const watchGroups     = createWatcherFor('groups', prepareGroups, addGroups);
const watchThreads    = createWatcherFor('threads', prepareThreads, addThreads);
const watchPosts      = createWatcherFor('posts', preparePosts, addPosts);
const watchUsers      = createWatcherFor('users', prepareUsers, addUsers);
const watchWatchlists = createWatcherFor('watchlists', prepareWatchlists, addWatchlists);

function* addGroupSaga(action) {
  const {
    group, user, name, groupLimited, threadLimited, joinLimited
  } = action.payload;
  const params = {
    parent_group_id: group,
    user_id: user,
    name: name,
    group_limited: groupLimited,
    thread_limited: threadLimited,
    join_limited: joinLimited
  };
  const { id } = yield call(pushMessage, commonChannel, 'groups', 'add', params);
  yield put(push("/groups/" + id))
}

function* addThreadSaga(action) {
  const { group, user, title, postLimited } = action.payload;
  const params = {
    parent_group_id: group,
    user_id: user,
    title: title,
    post_limited: postLimited
  };
  const { id } = yield call(pushMessage, commonChannel, 'threads', 'add', params);
  yield put(push("/threads/" + id))
}

function* addPostSaga(action) {
  const { thread, user, title, text } = action.payload;
  const params = {
    thread_id: thread,
    user_id: user,
    title,
    text
  };
  yield call(pushMessage, commonChannel, 'posts', 'add', params);
}

function* addWatchlistSaga(action) {
  const { user, name } = action.payload;
  const params = {
    user_id: user,
    name
  };
  const { id } = yield call(pushMessage, commonChannel, 'watchlists', 'add', params);
  yield put(push("/watchlists/" + id))
}

function* watchGroupSaga(action) {
  const { watchlist, group } = action.payload;
  const params = {
    watchlist_id: watchlist,
    group_id: group
  };
  const { id } = yield call(pushMessage, commonChannel, 'watchlists', 'watch group', params);
  const newWatchlist = Object.assign({},
    yield select(({ watchlists }) => watchlists[watchlist]))
  newWatchlist.watch_groups = newWatchlist.watch_groups.concat(id)
  yield put(updateWatchlist(watchlist, newWatchlist))
}

function* watchThreadSaga(action) {
  const { watchlist, thread } = action.payload;
  const params = {
    watchlist_id: watchlist,
    thread_id: thread
  };
  const { id } = yield call(pushMessage, commonChannel, 'watchlists', 'watch thread', params);
  const newWatchlist = Object.assign({},
    yield select(({ watchlists }) => watchlists[watchlist]))
  newWatchlist.watch_threads = newWatchlist.watch_threads.concat(id)
  yield put(updateWatchlist(watchlist, newWatchlist))
}

export default function*() {
  yield fork(watchGroups);
  yield fork(watchThreads);
  yield fork(watchPosts);
  yield fork(watchUsers);
  yield fork(watchWatchlists);

  yield fork(takeEvery, submitGroup.getType(), addGroupSaga);
  yield fork(takeEvery, submitThread.getType(), addThreadSaga);
  yield fork(takeEvery, submitPost.getType(), addPostSaga);
  yield fork(takeEvery, submitWatchlist.getType(), addWatchlistSaga);

  yield fork(takeEvery, watchGroup.getType(), watchGroupSaga);
  yield fork(takeEvery, watchThread.getType(), watchThreadSaga);
};

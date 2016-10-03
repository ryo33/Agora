import { fork, take, put, select, call, race, actionChannel } from 'redux-saga/effects';
import { takeEvery, channel, delay } from 'redux-saga';
import { push } from 'react-router-redux';

import { accountChannel, commonChannel, pushMessage, pushMessage2 } from 'socket';

import {
  addGroups, addThreads, addPosts, addUsers, addWatchlists,
  prepareGroups, prepareThreads, preparePosts, prepareUsers, prepareWatchlists,
  submitGroup, submitThread, submitPost, submitWatchlist, submitUser,
  watchThread, watchGroup, addWatchGroup, addWatchThread,
  updateWatchlist
} from 'actions/resources';
import { showLoadingError } from 'actions/global';

const COLLECT_TIME = 30;

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
      resultChannel.put({ resources: lackingResources });
    } else if (timeout) {
      resultChannel.put({ timeout: true });
    } else {
      resultChannel.put({ error });
    }
  }
}

function* delaySaga(time, timeoutChannel) {
  yield call(delay, time);
  timeoutChannel.put(true);
}

function createWatcherFor(resource, prepare, add) {
  return function*() {
    let fetchingIDs = new Set();
    let waitingIDs = new Set();

    let fetchingTask = null;
    let timeoutTask = null;

    const resultChannel = channel();
    const resourceChannel = yield actionChannel(prepare.getType());
    const timeoutChannel = channel();

    function* collect() {
      if (timeoutTask == null) {
        timeoutTask = yield fork(delaySaga, COLLECT_TIME, timeoutChannel);
      }
    }

    while (true) {
      const { result, prepareAction, collected } = yield race({
        result: take(resultChannel),
        prepareAction: take(resourceChannel),
        collected: take(timeoutChannel),
      });
      if (result) {
        const { resources, timeout, error } = result;
        fetchingTask = null;
        if (resources) {
          fetchingIDs.clear();
          if (waitingIDs.size != 0) {
            yield* collect();
          }
          if (resources.length != 0) {
            yield put(add(resources));
          }
        } else if (timeout) {
          yield* collect();
        } else {
          yield put(showLoadingError(error));
        }
      } else if (prepareAction) {
        const ids = prepareAction.payload;
        ids.forEach(id => {
          if (!fetchingIDs.has(id)) { waitingIDs.add(id); }
        })
        yield* collect();
      } else if (collected) {
        timeoutTask = null;
        for(const id of waitingIDs.values()) {
          fetchingIDs.add(id);
        }
        waitingIDs.clear();
        if (fetchingIDs.size != 0) {
          fetchingTask = yield fork(fetchResources, resource, resultChannel, fetchingIDs);
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

function* addPostSaga(action) {
  const { thread, user, title, text, defaultUser } = action.payload;
  const params = {
    thread_id: thread,
    user_id: user,
    title,
    text
  };
  yield call(pushMessage, commonChannel, 'posts', 'add', {
    params, default_user: defaultUser
  });
}

function* addWatchlistSaga(action) {
  const { user, name } = action.payload;
  const params = {
    user_id: user,
    name
  };
  const { id } = yield call(pushMessage, commonChannel, 'watchlists', 'add', params);
  yield put(push('/watchlists/' + id))
}

function* addUserSaga(action) {
  const { uid, name } = action.payload;
  const params = {
    uid, name
  };
  yield call(pushMessage, accountChannel, 'users', 'add', params);
  yield put(push('/account/users'))
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

  yield fork(takeEvery, submitPost.getType(), addPostSaga);
  yield fork(takeEvery, submitWatchlist.getType(), addWatchlistSaga);
  yield fork(takeEvery, submitUser.getType(), addUserSaga);

  yield fork(takeEvery, watchGroup.getType(), watchGroupSaga);
  yield fork(takeEvery, watchThread.getType(), watchThreadSaga);
};

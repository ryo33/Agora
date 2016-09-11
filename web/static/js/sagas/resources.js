import { fork, take, put, select, call, race, actionChannel } from 'redux-saga/effects';
import { takeEvery, channel, delay } from 'redux-saga';

import { commonChannel, pushMessage } from 'socket';

import {
  addGroups, addThreads, addPosts, addUsers,
    prepareGroups, prepareThreads, preparePosts, prepareUsers
} from 'actions/resources';

const TIMEOUT = 1500;

function* fetchResources(resource, resultChannel, idsSet) {
  const ids = Array.from(idsSet);
  const havingResources = yield select(({ [resource]: resources }) => resources);
  const lackingIDs = ids.filter(id => ! havingResources.hasOwnProperty(id));
  if (lackingIDs.length != 0) {
    const result = yield call(pushMessage, commonChannel, resource, 'fetch', lackingIDs);
    const lackingResources = result[resource];
    if (lackingResources.length != 0) {
      resultChannel.put(lackingResources);
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
        if (fetchingTask) {
          for(const id of waitingIDs.values()) {
            fetchingIDs.add(id);
          }
          yield* fetch();
        }
      } else if (result) {
        fetchingTask = null;
        swapIDs();
        yield* fetch();
        yield put(add(result));
      } else {
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

const watchGroups  = createWatcherFor('groups', prepareGroups, addGroups);
const watchThreads = createWatcherFor('threads', prepareThreads, addThreads);
const watchPosts   = createWatcherFor('posts', preparePosts, addPosts);
const watchUsers   = createWatcherFor('users', prepareUsers, addUsers);

export default function*() {
  yield fork(watchGroups);
  yield fork(watchThreads);
  yield fork(watchPosts);
  yield fork(watchUsers);
};

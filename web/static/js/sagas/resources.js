import { fork, take, put, select, call, race } from 'redux-saga/effects';
import { takeEvery, channel } from 'redux-saga';

import { commonChannel, pushMessage } from 'socket';

import {
  addGroups, addThreads, addPosts, addUsers,
    prepareGroups, prepareThreads, preparePosts, prepareUsers
} from 'actions/resources';

function* fetchResources(resource, resultChannel, ids) {
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

function* watchFetchingAction(actionChannel, action) {
  yield call(actionChannel.put, action);
}

function createWatcherFor(resource, prepare, add) {
  return function*() {
    let fetchingIDs = new Set();
    let waitingIDs = new Set();
    let fetching = false;
    const resultChannel = channel();
    const actionChannel = channel();

    function* fetch(resource, resultChannel, ids) {
      fetching = true;
      ids.forEach(id => {
        fetchingIDs.add(id);
      });
      yield fork(fetchResources, resource, resultChannel, ids);
    }

    yield fork(takeEvery, prepare.getType(), watchFetchingAction, actionChannel);

    while (true) {
      const { result, fetchingAction } = yield race({
        result: take(resultChannel),
        fetchingAction: take(actionChannel)
      });
      if (result) {
        fetching = false;
        fetchingIDs.clear();
        if (waitingIDs.size != 0) {
          yield* fetch(resource, resultChannel, Array.from(waitingIDs.values()));
          fetchingIDs = waitingIDs;
          waitingIDs = new Set();
        }
        yield put(add(result));
      } else {
        const ids = fetchingAction.payload;
        if (ids.length != 0) {
          if (fetching) {
            ids.forEach(id => {
              if (!fetchingIDs.has(id)) {
                waitingIDs.add(id);
              }
            });
          } else {
            yield* fetch(resource, resultChannel, ids);
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

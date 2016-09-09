import { takeEvery, takeLatest, eventChannel, END } from 'redux-saga';
import { fork, take, call, put, cancel, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { accountChannel, commonChannel, pushMessage } from 'socket';
import {
  addGroup, addThread,
    openAccountThreadsPage, updateThreads,
    openAccountGroupsPage, updateGroups,
    updateCurrentUser
} from 'actions/accountPage';

import {
  prepareThreads, prepareGroups
} from 'actions/resources';

function* addThreadSaga(action) {
  const { user, title } = action.payload;
  const params = {
    user_id: user,
    title
  };
  const { id } = yield call(pushMessage, commonChannel, 'threads', 'add', params);
  yield put(push("/threads/" + id))
}

function* addGroupSaga(action) {
  const { user, name } = action.payload;
  const params = {
    user_id: user,
    name
  };
  const { id } = yield call(pushMessage, commonChannel, 'groups', 'add', params);
  yield put(push("/groups/" + id))
}

function* fetchThreadsSaga() {
  const { threads } = yield call(pushMessage, commonChannel, 'threads', 'get by account');
  yield put(prepareThreads(threads));
  yield put(updateThreads(threads));
}

function* fetchGroupsSaga() {
  const { groups } = yield call(pushMessage, commonChannel, 'groups', 'get by account');
  yield put(prepareGroups(groups));
  yield put(updateGroups(groups));
}

function* updateCurrentUserSaga(action) {
  const id = action.payload;
  accountChannel.push('set_current_user', id);
}

export default function*() {
  yield fork(takeEvery, addThread.getType(), addThreadSaga);
  yield fork(takeEvery, addGroup.getType(), addGroupSaga);
  yield fork(takeLatest, openAccountThreadsPage.getType(), fetchThreadsSaga);
  yield fork(takeLatest, openAccountGroupsPage.getType(), fetchGroupsSaga);

  yield fork(takeLatest, updateCurrentUser.getType(), updateCurrentUserSaga);
}

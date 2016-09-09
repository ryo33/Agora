import { takeEvery, takeLatest, eventChannel, END } from 'redux-saga';
import { fork, take, call, put, cancel, select } from 'redux-saga/effects';

import { socket, commonChannel, pushMessage, joinGroupChannel } from 'socket';
import {
  openGroupPage, closeGroupPage, updateCurrentGroup,
  openAllGroupsPage, updateGroups,
    openGroupThreadsTab, updateGroupThreads,
    openGroupGroupsTab, updateGroupGroups,
    openGroupMembersTab, updateGroupMembers,
    addMember, addThread
} from 'actions/groupPage';
import {
  prepareGroups, prepareThreads, prepareUsers
} from 'actions/resources';
import { pageSaga } from './threadPage';

function* preparePostsSaga(action) {
  const ids = action.payload;
  yield put(preparePosts(ids));
}

function* fetchGroupsSaga() {
  const { groups } = yield call(pushMessage, commonChannel, 'groups', 'fetch all groups');
  yield put(prepareGroups(groups));
  yield put(updateGroups(groups));
}

function* fetchGroupGroupsSaga(action) {
  const id = action.payload;
  const { groups } = yield call(pushMessage, commonChannel, 'groups', 'get by group', id);
  yield put(prepareGroups(groups));
  yield put(updateGroupGroups(groups));
}

function* fetchGroupThreadsSaga(action) {
  const id = action.payload;
  const { threads } = yield call(pushMessage, commonChannel, 'threads', 'get by group', id);
  yield put(prepareThreads(threads));
  yield put(updateGroupThreads(threads));
}

function* fetchGroupMembersSaga(action) {
  const id = action.payload;
  const { members } = yield call(pushMessage, commonChannel, 'members', 'get by group', id);
  yield put(prepareUsers(members));
  yield put(updateGroupMembers(members));
}

function joinCallback(emitter, resp) {
}

function listenCallback(emitter, channel) {
  channel.on('add members', ({ members }) => {
    emitter(updateGroupMembers(members));
  });
  channel.on('add threads', ({ threads }) => {
    emitter(updateGroupThreads(threads));
  });
}

function* addMemberSaga(action) {
  const { group, user } = action.payload;
  const params = {
    group_id: group,
    user_id: user
  };
  yield call(pushMessage, commonChannel, 'members', 'add', params);
}

function* addThreadSaga(action) {
  const { group, user, title } = action.payload;
  const params = {
    parent_group_id: group,
    user_id: user,
    title: title
  };
  yield call(pushMessage, commonChannel, 'threads', 'add', params);
}

function* prepareSaga(prepare, action) {
  const ids = action.payload;
  yield put(prepare(ids));
}

export default function*() {
  yield fork(pageSaga, 'group', openGroupPage, closeGroupPage, prepareGroups, updateCurrentGroup, joinCallback, listenCallback);
  yield fork(takeLatest, openAllGroupsPage.getType(), fetchGroupsSaga);
  yield fork(takeLatest, openGroupGroupsTab.getType(), fetchGroupGroupsSaga);
  yield fork(takeLatest, openGroupThreadsTab.getType(), fetchGroupThreadsSaga);
  yield fork(takeLatest, openGroupMembersTab.getType(), fetchGroupMembersSaga);

  yield fork(takeEvery, addMember.getType(), addMemberSaga);
  yield fork(takeEvery, addThread.getType(), addThreadSaga);

  yield fork(takeEvery, updateGroupGroups.getType(), prepareSaga, prepareGroups);
  yield fork(takeEvery, updateGroupThreads.getType(), prepareSaga, prepareThreads);
  yield fork(takeEvery, updateGroupMembers.getType(), prepareSaga, prepareUsers);
}

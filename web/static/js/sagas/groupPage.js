import { takeEvery, takeLatest, eventChannel, END } from 'redux-saga';
import { fork, take, call, put, cancel, select } from 'redux-saga/effects';

import { socket, commonChannel, pushMessage, joinGroupChannel } from 'socket';
import {
  openGroupPage, closeGroupPage, updateCurrentGroup,
  openAllGroupsPage, updateGroups,
    openGroupThreadsTab, updateGroupThreads,
    openGroupGroupsTab, updateGroupGroups,
    openGroupMembersTab, updateGroupMembers,
    addMember
} from 'actions/groupPage';
import { pageSaga } from './threadPage';

function* fetchGroupsSaga() {
  const { groups } = yield call(pushMessage, commonChannel, 'groups', 'fetch all groups');
  yield put(updateGroups(groups));
}

function* fetchGroupGroupsSaga(action) {
  const id = action.payload;
  const { groups } = yield call(pushMessage, commonChannel, 'groups', 'get by group', id);
  yield put(updateGroupGroups(groups));
}

function* fetchGroupThreadsSaga(action) {
  const id = action.payload;
  const { threads } = yield call(pushMessage, commonChannel, 'threads', 'get by group', id);
  yield put(updateGroupThreads(threads));
}

function joinCallback(emitter, { members }) {
  emitter(updateGroupMembers(members));
}

function listenCallback(emitter, channel) {
  channel.on('add members', ({ members }) => {
    emitter(updateGroupMembers(members));
  });
  channel.on('add threads', ({ threads }) => {
    emitter(updateGroupThreads(threads));
  });
  channel.on('add groups', ({ groups }) => {
    emitter(updateGroupGroups(groups));
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

export default function*() {
  yield fork(pageSaga, 'group', openGroupPage, closeGroupPage, updateCurrentGroup, joinCallback, listenCallback);
  yield fork(takeLatest, openAllGroupsPage.getType(), fetchGroupsSaga);
  yield fork(takeLatest, openGroupGroupsTab.getType(), fetchGroupGroupsSaga);
  yield fork(takeLatest, openGroupThreadsTab.getType(), fetchGroupThreadsSaga);

  yield fork(takeEvery, addMember.getType(), addMemberSaga);
}

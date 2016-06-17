import { fork, take, call, put } from 'redux-saga/effects';

import { pushMessageToGroupChannel } from 'socket'

import { receiveMembers, updateMembers,
  fetchMissingMembers, receiveMissingMembers
} from 'actions/groups';

function* fetchMembersSaga() {
  while (true) {
    const { payload } = yield take('FETCH_MEMBERS');
    const { members } = yield call(pushMessageToGroupChannel, 'member', {
      action: 'fetch', params: { id: payload }
    })
    let membersMap = {};
    let membersList = [];
    members.forEach(({ id, user, group_id, inserted_at, updated_at }) => {
      membersMap[id] = { id, user, group_id, inserted_at, updated_at };
      membersList.push(id);
    });
    yield put(receiveMembers(payload, membersMap, membersList));
  }
}

function* receiveMembersSaga(getState) {
  while (true) {
    const { payload } = yield take('RECEIVE_MEMBERS');
    const { id, membersMap, membersList } = payload;
    const groups = getState().groups;
    const group = groups.groups[id] || {};
    const newMembersMap = Object.assign({}, group.membersMap || {}, membersMap);
    yield put(updateMembers(id, newMembersMap, membersList));
    let missingIDs = [];
    membersList.forEach((memberID, key) => {
      if (! memberID in newMembersMap) {
        missingIDs.push(memberId);
      }
    });
    if (missingIDs.length > 0) {
      yield put(fetchMissingMembers(missingIDs));
    }
  }
}

function* fetchMissingMembersSaga() {
  while (true) {
    const { payload } = yield take('FETCH_MISSING_MEMBERS');
    const { members } = yield call(pushMessageToGroupChannel, 'member', {
      action: 'fetch_members', params: { ids: payload }
    })
    const membmersMap = {}
    membmers.forEach(({ id, user, group_id, inserted_at, updated_at }) => {
      membmersMap[id] = { id, user, group_id, inserted_at, updated_at }
    })
    yield put(receiveMissingMembers(id, membmersMap))
  }
}

export default function* groupSaga(getState) {
  yield fork(fetchMembersSaga);
  yield fork(receiveMembersSaga, getState);
  yield fork(fetchMissingMembersSaga);
}

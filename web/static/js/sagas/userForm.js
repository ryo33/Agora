import { takeLatest } from 'redux-saga';
import { fork, take, call, put } from 'redux-saga/effects';

import { pushMessage, commonChannel } from 'socket';

import { updateUserFormQuery, receiveSuggestedUsers } from 'actions/userForm';

function* requestSuggestions({ payload: { value, groupID } }) {
  if (value.trim().length >= 1) {
    const params = {
      query: value,
      group_id_to_join: groupID
    }
    const { users } = yield call(pushMessage, commonChannel, 'users', 'search', params);
    yield put(receiveSuggestedUsers(groupID, users));
  } else {
    yield put(receiveSuggestedUsers(groupID, []));
  }
}

export default function* userFormSaga() {
  yield fork(takeLatest, updateUserFormQuery.getType(), requestSuggestions);
}

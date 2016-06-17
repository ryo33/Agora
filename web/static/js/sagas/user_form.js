import { takeLatest } from 'redux-saga';
import { fork, take, call, put } from 'redux-saga/effects';
import { attachKey } from 'associative-reducer';

import { pushMessageToCommonChannel } from 'socket';

import { receiveSuggestedUsers } from 'actions/user_form';

function* requestSuggestions({ payload: { value, groupID } }) {
  if (value.trim().length >= 1) {
    const params = {
      query: value,
      group_id_to_join: groupID
    }
    const { users } = yield call(pushMessageToCommonChannel, 'user', {action: 'search', params});
    yield put(attachKey(receiveSuggestedUsers(users), groupID));
  } else {
    yield put(attachKey(receiveSuggestedUsers([]), groupID));
  }
}

function* handleRequestSuggestions() {
  yield takeLatest('UPDATE_USER_FORM_QUERY', requestSuggestions);
}

export default function* userFormSaga() {
  yield fork(handleRequestSuggestions);
}

import { fork, take, call, put } from 'redux-saga/effects';

import { accountChannel, pushMessage } from 'socket';

import { updateCurrentThread } from 'actions/threads';
import { submitPost } from 'actions/posts';

function* submitPostSaga() {
  while (true) {
    const { payload } = yield take(`${submitPost}`);
    yield call(pushMessage, accountChannel, 'post', {
      action: 'add',
      params: payload,
    });
  }
}

export default function* postSaga() {
  yield fork(submitPostSaga);
}

import { fork } from 'redux-saga/effects';
import groupSaga from './groups';
import userFormSaga from './user_form';
import threadSaga from './thread';
import postSaga from './post';

export default function* rootSaga(getState) {
  yield fork(groupSaga, getState);
  yield fork(userFormSaga, getState);
  yield fork(threadSaga, getState);
  yield fork(postSaga, getState);
}

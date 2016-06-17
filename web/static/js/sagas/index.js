import { fork } from 'redux-saga/effects';
import groupSaga from './groups';
import userFormSaga from './user_form';

export default function* rootSaga(getState) {
  yield fork(groupSaga, getState);
  yield fork(userFormSaga, getState);
}

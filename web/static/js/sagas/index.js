import { fork } from 'redux-saga/effects';

import resourcesSaga from 'sagas/resources';

import threadPageSaga from 'sagas/threadPage';
import groupPageSaga from 'sagas/groupPage';
import watchlistPageSaga from 'sagas/watchlistPage';
import accountPageSaga from 'sagas/accountPage';

import userFormSaga from 'sagas/userForm';

export default function*() {
  yield fork(resourcesSaga);

  yield fork(threadPageSaga);
  yield fork(groupPageSaga);
  yield fork(watchlistPageSaga);
  yield fork(accountPageSaga);

  yield fork(userFormSaga);
};

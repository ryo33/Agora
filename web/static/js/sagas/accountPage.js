import { takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { fork, take, call, put, cancel, select } from 'redux-saga/effects'

import { accountChannel, commonChannel, pushMessage } from 'socket'
import {
  openAccountThreadsPage, updateThreads,
    openAccountGroupsPage, updateGroups,
    updateCurrentUser,
} from 'actions/accountPage'

function* fetchThreadsSaga() {
  const { threads } = yield call(pushMessage, commonChannel, 'threads', 'get by account')
  yield put(updateThreads(threads))
}

function* fetchGroupsSaga() {
  const { groups } = yield call(pushMessage, commonChannel, 'groups', 'get by account')
  yield put(updateGroups(groups))
}

function* updateCurrentUserSaga(action) {
  const id = action.payload
  accountChannel.push('set_current_user', id)
}

export default function* () {
  yield fork(takeLatest, openAccountThreadsPage.getType(), fetchThreadsSaga)
  yield fork(takeLatest, openAccountGroupsPage.getType(), fetchGroupsSaga)

  yield fork(takeLatest, updateCurrentUser.getType(), updateCurrentUserSaga)
}

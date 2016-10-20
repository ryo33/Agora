import { takeLatest } from 'redux-saga'
import { fork, take, call, put } from 'redux-saga/effects'

import { pushMessage, commonChannel } from 'socket'

import { updateNewUserFormQuery, receiveSuggestedUserExists } from 'actions/accountPage/newUserForm'

function* requestSuggestions({ payload: { value } }) {
  const params = {
    query: value,
  }
  const { exists } = yield call(pushMessage, commonChannel, 'users', 'exists', params)
  yield put(receiveSuggestedUserExists(exists))
}

export default function* userFormSaga() {
  yield fork(takeLatest, updateNewUserFormQuery.getType(), requestSuggestions)
}

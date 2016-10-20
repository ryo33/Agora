import { takeEvery, takeLatest, eventChannel, END } from 'redux-saga'
import { fork, take, call, put, cancel, select } from 'redux-saga/effects'

function joinChannel(resource, id, join, listen) {
  const channel = socket.channel(`${resource}:${id}`, {})

  return eventChannel((emitter) => {
    const actionEmitter = action => emitter({ action })
    channel.join()
      .receive('ok', resp => join(actionEmitter, resp))
      .receive('error', resp => console.log('Unable to join', resp))
    listen(actionEmitter, channel)

    return () => {
      channel.leave()
    }
  })
}

function* watchChannel(channel) {
  while (true) {
    const { action } = yield take(channel)
    if (action) {
      yield put(action)
    }
  }
}

function* joinPageSaga(resource, closePage, updateCurrent, join, listen, action) {
  let channel = null
  let watchChannelTask = null
  try {
    const id = action.payload
    yield put(updateCurrent(id))
    channel = yield call(joinChannel, resource, id, join, listen)
    watchChannelTask = yield fork(watchChannel, channel)

    yield take(closePage.getType())
  } finally {
    if (watchChannelTask !== null) {
      yield cancel(watchChannelTask)
    }
    if (channel !== null) {
      channel.close()
    }
  }
}

export function* pageSaga(resource, openPage, closePage, updateCurrent, join, listen) {
  yield fork(takeEvery, openPage.getType(), joinPageSaga,
    resource, closePage, updateCurrent, join, listen)
}

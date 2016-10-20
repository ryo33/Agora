import { Socket } from 'phoenix'

import {
  updateAccountUsers, updateCurrentUser, addAccountUser, updateWatchlists,
} from 'actions/accountPage.js'
import {
  prepareUsers, prepareWatchlists,
} from 'actions/resources'
import { token, accountID } from 'global'

export const socket = new Socket('/socket', {
  reconnectAfterMs: (tries) => {
    if (tries < 10) return 1000
    else if (tries < 20) return 2000
    else if (tries < 30) return 3000
    else return 5000
  },
  params: { token },
})
socket.connect()
window.socket = socket

export const accountChannel = socket.channel(`account:${accountID}`, {})
window.accountChannel = accountChannel
export const commonChannel = socket.channel('common', {})
window.commonChannel = commonChannel

export const pushMessage2 = (channel, event, action, params = null) => {
  return new Promise((resolve, reject) => {
    channel.push(event, { action, params })
    .receive('ok', result => resolve({ result }))
    .receive('error', reasons => resolve({ error: reasons }))
    .receive('timeout', () => resolve({ timeout: true }))
  })
}

export const pushMessage = (channel, event, action, params = null) => {
  return new Promise((resolve, reject) => {
    channel.push(event, { action, params })
    .receive('ok', msg => resolve(msg))
    .receive('error', reasons => reject(Error(reasons)))
    .receive('timeout', () => reject(Error('Timeout Error')))
  })
}

export function pushMessageToGroupChannel(event, msg) {
  return pushMessage(groupChannel, event, msg)
}

export function pushMessageToCommonChannel(event, msg) {
  return pushMessage(commonChannel, event, msg)
}

export const joinAccountChannel = (dispatch) => {
  accountChannel.on('add user', ({ user }) => {
    dispatch(prepareUsers([user]))
    dispatch(addAccountUser(user))
  })
  accountChannel.on('add watchlists', ({ watchlists }) => {
    dispatch(prepareUsers(watchlists))
    dispatch(updateWatchlists(watchlists))
  })
  accountChannel.on('update current user', ({ user }) => {
    dispatch(prepareUsers([user]))
    dispatch(updateCurrentUser(user))
  })
  accountChannel.join()
    .receive('ok', ({ users, watchlists }) => {
      dispatch(prepareUsers(users))
      dispatch(updateAccountUsers(users))
      dispatch(prepareWatchlists(watchlists))
      dispatch(updateWatchlists(watchlists))
    })
    .receive('error', (resp) => { console.log('Unable to join', resp) })
}

export const joinCommonChannel = (dispatch) => {
  commonChannel.on('dispatch', ({ actions }) => {
    actions.map((action) => { dispatch(action) })
  })
  commonChannel.join()
    .receive('ok', ({ actions }) => {
      actions.map((action) => { dispatch(action) })
    })
    .receive('error', (resp) => { console.log('Unable to join', resp) })
}

export const leaveChannel = (channel) => {
  channel.leave()
}

import { Socket } from 'phoenix';

import {
  updateAccountUsers, updateCurrentUser, addAccountUser
} from 'actions/accountPage.js';

import {
  prepareUsers
} from 'actions/resources';

export const socket = new Socket('/socket', {
  reconnectAfterMs: (tries) => {
    if (tries < 10) return 1000;
    else if (tries < 20) return 2000;
        else if (tries < 30) return 3000;
        else return 5000;
  },
  params: { token: window.token },
});
socket.connect();
window.socket = socket;

export const accountChannel = window.socket.channel("account:" + window.accountID, {});
window.accountChannel = accountChannel;
export const commonChannel = window.socket.channel("common", {});
window.commonChannel = commonChannel;

export const pushMessage = (channel, event, action, params=null) => {
  return new Promise((resolve, reject) => {
    channel.push(event, {action, params})
    .receive('ok', msg => resolve(msg))
    .receive('error', reasons => reject(Error(reasons)))
    .receive('timeout', () => reject(Error("Timeout Error")))
  });
}

export function pushMessageToGroupChannel(event, msg) {
  return pushMessage(window.groupChannel, event, msg)
}

export function pushMessageToCommonChannel(event, msg) {
  return pushMessage(window.commonChannel, event, msg)
}

export const joinAccountChannel = (dispatch) => {
  window.accountChannel.on('add user', ({ user }) => {
    dispatch(prepareUsers([user]));
    dispatch(addAccountUser(user));
  });
  window.accountChannel.on('update current user', ({ user }) => {
    dispatch(prepareUsers([user]));
    dispatch(updateCurrentUser(user));
  });
  window.accountChannel.join()
    .receive('ok', ({ users }) => {
      dispatch(prepareUsers(users));
      dispatch(updateAccountUsers(users));
    })
    .receive('error', resp => { console.log('Unable to join', resp); });
};

export const joinCommonChannel = (dispatch) => {
  window.commonChannel.on('dispatch', ({ actions }) => {
    actions.map(action => { dispatch(action); });
  });
  window.commonChannel.join()
    .receive('ok', ({ actions }) => {
      actions.map(action => { dispatch(action); });
    })
    .receive('error', resp => { console.log('Unable to join', resp); });
};

export const leaveChannel = (channel) => {
  channel.leave();
};

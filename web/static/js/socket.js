import { Socket } from 'phoenix';

window.socket = new Socket('/socket', {
  reconnectAfterMs: (tries) => {
    if (tries < 10) return 1000;
    else if (tries < 20) return 2000;
        else if (tries < 30) return 3000;
        else return 5000;
  },
  params: { token: window.token },
});
window.socket.connect();

window.accountChannel = window.socket.channel("account:" + window.accountID, {})
window.commonChannel = window.socket.channel("common", {})

export const pushMessage = (channel, event, payload) => {
  return new Promise((resolve, reject) => {
    channel.push(event, payload)
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
  window.accountChannel.on('dispatch', ({ actions }) => {
    actions.map(action => { dispatch(action); });
  });
  window.accountChannel.join()
    .receive('ok', ({ actions }) => {
      actions.map(action => { dispatch(action); })
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

export const joinThreadChannel = (dispatch, id) => {
  window.threadChannel = window.socket.channel('thread:' + id, {});
  window.threadChannel.on('dispatch', ({ actions }) => {
    actions.map(action => { dispatch(action); });
  });
  return window.threadChannel.join()
    .receive('error', resp => { console.log('Unable to join', resp); });
};

export const joinGroupChannel = (dispatch, id) => {
    window.groupChannel = window.socket.channel("group:" + id, {})
    window.groupChannel.on("dispatch", ({ actions }) => {
        actions.map(action => { dispatch(action) })
    })
    return window.groupChannel.join()
    .receive("error", resp => { console.log("Unable to join", resp) })
}

export const leaveChannel = (channel) => {
  channel.leave();
};

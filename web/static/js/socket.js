import {Socket} from 'phoenix'

window.socket = new Socket('/socket', {params: {token: window.token}})
window.socket.connect()

export const joinAccountChannel = (dispatch) => {
    window.accountChannel = window.socket.channel("account:" + window.accountID, {})
    window.accountChannel.on("dispatch", ({ actions }) => {
        actions.map(action => { dispatch(action) })
    })
    window.accountChannel.join()
    .receive("ok", ({ actions }) => {
        actions.map(action => { dispatch(action) })
    })
    .receive("error", resp => { console.log("Unable to join", resp) })
}

export const joinThreadChannel = (dispatch, id) => {
    window.threadChannel = window.socket.channel("thread:" + id, {})
    window.threadChannel.on("dispatch", ({ actions }) => {
        actions.map(action => { dispatch(action) })
    })
    window.threadChannel.join()
    .receive("ok", ({ actions }) => {
        actions.map(action => { dispatch(action) })
    })
    .receive("error", resp => { console.log("Unable to join", resp) })
}

export const leaveChannel = (channel) => {
    channel.leave()
}

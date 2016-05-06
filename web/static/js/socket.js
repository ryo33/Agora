import {Socket} from 'phoenix'

window.socket = new Socket('/socket', {
    reconnectAfterMs: (tries) => {
        if (tries < 10) return 1000
        else if (tries < 20) return 2000
        else if (tries < 30) return 3000
        else return 5000
    },
    params: {token: window.token}
})
window.socket.connect()

window.accountChannel = window.socket.channel("account:" + window.accountID, {})
window.commonChannel = window.socket.channel("common", {})

export const joinAccountChannel = (dispatch) => {
    window.accountChannel.on("dispatch", ({ actions }) => {
        actions.map(action => { dispatch(action) })
    })
    window.accountChannel.join()
    .receive("ok", ({ actions }) => {
        actions.map(action => { dispatch(action) })
    })
    .receive("error", resp => { console.log("Unable to join", resp) })
}

export const joinCommonChannel = (dispatch) => {
    window.commonChannel.on("dispatch", ({ actions }) => {
        actions.map(action => { dispatch(action) })
    })
    window.commonChannel.join()
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
    return window.threadChannel.join()
    .receive("error", resp => { console.log("Unable to join", resp) })
}

export const joinGroupChannel = (dispatch, id) => {
    window.groupChannel = window.socket.channel("group:" + id, {})
    window.groupChannel.on("dispatch", ({ actions }) => {
        actions.map(action => { dispatch(action) })
    })
    return window.groupChannel.join()
    .receive("error", resp => { console.log("Unable to join", resp) })
}

export const leaveChannel = (channel) => {
    channel.leave()
}

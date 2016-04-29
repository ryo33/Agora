import {Socket} from 'phoenix'

window.socket = new Socket('/socket', {params: {token: window.accountToken}})
window.socket.connect()

export const createAccountChannel = (store) => {
    window.accountChannel = window.socket.channel("account:" + window.accountID, {})
    window.accountChannel.on("dispatch", ({ actions }) => {
        actions.map(action => { store.dispatch(action) })
    })
    window.accountChannel.join()
    .receive("ok", ({ actions }) => {
        actions.map(action => { store.dispatch(action) })
    })
    .receive("error", resp => { console.log("Unable to join", resp) })
}

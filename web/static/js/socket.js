import {Socket} from 'phoenix'

window.socket = new Socket('/socket', {params: {token: window.accountToken}})
window.socket.connect()

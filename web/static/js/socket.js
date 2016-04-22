import {Socket} from 'phoenix'

let socket = new Socket('/socket', {params: {token: window.userToken}})

const topic_prefix = 'room:'
const global_topic = topic_prefix + 'global'
const getAccountTopic = (id) => topic_prefix + id
const resources = ['users', 'groups', 'threads', 'posts']

const getTopicFromRouting = (routing) => {
    let path = routing.split('/').filter(s => s.length > 0)
    if (path.length == 0) {
        return null
    } else if (path[0] in resources && path.length in [1, 2]) {
        return topic_prefix + path.join(':')
    } else if (path[0] == 'account') {
        if (path[1] in resources && path.length in [2, 3]) {
            return topic_prefix + path.join(':')
        }
    }
    return null
}

export { socket, getTopicFromRouting, getAccountTopic }

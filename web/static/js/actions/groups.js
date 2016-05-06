export function fetchGroupThreads(id) {
    return (dispatch, getState) => {
        dispatch(requestGroupThreads(id))
        window.groupChannel.push('thread', {
            action: 'fetch_group_threads',
            params: {
                id: id
            }
        }).receive('ok', ({ threads }) => {
            let threadsMap = {}
            let threadsList = []
            threads.forEach(({ id, title, text, user, thread_id, inserted_at, updated_at }) => {
                threadsMap[id] = { title, text, user, thread_id, inserted_at, updated_at }
                threadsList.push(id)
            })
            dispatch(receiveGroupThreads(id, threadsMap, threadsList))
        })
    }
}

export function fetchGroupInfo(id) {
    return (dispatch, getState) => {
        dispatch(requestGroupInfo(id))
        window.groupChannel.push('group', {
            action: 'get_info',
            params: {
                id: id
            }
        }).receive('ok', ({ group }) => {
            dispatch(receiveGroupInfo(id, group))
        })
    }
}

export function receiveGroupThreads(id, threadsMap, threadsList) {
    return (dispatch, getState) => {
        const groups = getState().groups
        const group = groups.groups[id] || {}
        const newThreadMap = Object.assign({}, group.threadsMap || {}, threadsMap)
        dispatch(updateGroupThreads(id, newThreadMap, threadsList))
        let missingIDs = []
        threadsList.forEach((threadID, key) => {
            if (! threadID in newThreadMap) {
                missingIDs.push(threadId)
            }
        })
        if (missingIDs.length > 0) {
            dispatch(fetchMissingGroupThreads(missingIDs))
        }
    }
}

export function fetchMissingGroupThreads(id, ids) {
    return (dispatch) => {
        dispatch(requestMissingGroupThreads(id))
        window.groupChannel.push('thread', {action: 'fetch_threads', params: {ids: ids}})
        .receive('ok', ({ threads }) => {
            let threadsMap = {}
            threads.forEach(({ id, title, text, user, thread_id }) => {
                threadsMap[id] = { title, text, user, thread_id }
            })
            dispatch(receiveMissingGroupThreads(id, threadsMap))
        })
    }
}

export function addGroupThreads(id, threadsMap, threadsList) {
    return {
        type: 'ADD_GROUP_THREADS',
        id, threadsMap, threadsList
    }
}

export function updateCurrentGroup(id) {
    return {
        type: 'UPDATE_CURRENT_GROUP',
        id
    }
}

export function requestGroupThreads(id) {
    return {
        type: 'REQUEST_GROUP_THREADS',
        id
    }
}

export function requestMissingGroupThreads(id) {
    return {
        type: 'REQUEST_MISSING_GROUP_THREADS',
        id
    }
}

export function updateGroupThreads(id, threadsMap, threadsList) {
    return {
        type: 'UPDATE_GROUP_THREADS',
        id, threadsMap, threadsList
    }
}

export function receiveMissingGroupThreads(id, threadsMap) {
    return {
        type: 'RECEIVE_MISSING_GROUP_THREADS',
        id, threadsMap
    }
}

export function requestGroupInfo(id) {
    return {
        type: 'REQUEST_GROUP_INFO',
        id
    }
}

export function receiveGroupInfo(id, info) {
    return {
        type: 'UPDATE_GROUP_INFO',
        id, info
    }
}

export function switchGroupPageTabs(tab) {
    return {
        type: 'SWITCH_GROUP_PAGE_TAB',
        tab
    }
}

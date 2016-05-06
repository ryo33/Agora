export function fetchThreadContents(id) {
    return (dispatch, getState) => {
        dispatch(requestThreadContents(id))
        window.threadChannel.push('post', {
            action: 'fetch_thread_contents',
            params: {
                id: id
            }
        }).receive('ok', ({ thread, posts }) => {
            let postsMap = {}
            let postsList = []
            posts.forEach(({ id, title, text, user, post_id, inserted_at, updated_at }) => {
                postsMap[id] = { title, text, user, post_id, inserted_at, updated_at }
                postsList.push(id)
            })
            dispatch(receiveThreadContents(id, thread, postsMap, postsList))
        })
    }
}

export function receiveThreadContents(id, info, postsMap, postsList) {
    return (dispatch, getState) => {
        const threads = getState().threads
        const thread = threads.threads[id] || {}
        const newPostMap = Object.assign({}, thread.postsMap || {}, postsMap)
        dispatch(updateThreadContents(id, info, newPostMap, postsList))
        let missingIDs = []
        postsList.forEach((postID, key) => {
            if (! postID in newPostMap) {
                missingIDs.push(postId)
            }
        })
        if (missingIDs.length > 0) {
            dispatch(fetchMissingPosts(missingIDs))
        }
    }
}

export function fetchMissingPosts(id, ids) {
    return (dispatch) => {
        dispatch(requestMissingPosts(id))
        window.threadChannel.push('post', {action: 'fetch_posts', params: {ids: ids}})
        .receive('ok', ({ posts }) => {
            let postsMap = {}
            posts.forEach(({ id, title, text, user, post_id }) => {
                postsMap[id] = { title, text, user, post_id }
            })
            dispatch(receiveMissingPosts(id, postsMap))
        })
    }
}

export function receivePosts(id, postsMap, postsList) {
    return (dispatch, getState) => {
        const threads = getState().threads
        const thread = threads.threads[id] || {}
        const newPostMap = Object.assign({}, thread.postsMap || {}, postsMap)
        dispatch(addThreadContents(id, newPostMap, postsList))
        let missingIDs = []
        postsList.forEach((postID, key) => {
            if (! postID in newPostMap) {
                missingIDs.push(postId)
            }
        })
        if (missingIDs.length > 0) {
            dispatch(fetchMissingPosts(missingIDs))
        }
    }
}

export function addThreadContents(id, postsMap, postsList) {
    return {
        type: 'ADD_THREAD_CONTENTS',
        id, postsMap, postsList
    }
}

export function updateCurrentThread(id) {
    return {
        type: 'UPDATE_CURRENT_THREAD',
        id
    }
}

export function requestThreadContents(id) {
    return {
        type: 'REQUEST_THREAD_CONTENTS',
        id
    }
}

export function requestMissingPosts(id) {
    return {
        type: 'REQUEST_MISSING_POSTS',
        id
    }
}

export function updateThreadContents(id, info, postsMap, postsList) {
    return {
        type: 'UPDATE_THREAD_CONTENTS',
        id, info, postsMap, postsList
    }
}

export function receiveMissingPosts(id, postsMap) {
    return {
        type: 'RECEIVE_MISSING_POSTS',
        id, postsMap
    }
}

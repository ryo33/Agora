import { combineReducers } from 'redux'
import Immutable, { Map } from 'immutable'

const threadsRoot = combineReducers({
    currentThread, // id
    threads, // id => map
    isFetchingThreadContents, // id => bool
    isFetchingMissingPosts // id => bool
})
/*
    info: {
        id: '',
        title: '',
        parentGroup: {
            id: ''
        },
        user: {
            id: '',
            uid: '',
            name: ''
        }
    },
    postsMap: {
    },
    postList: []
* */

function currentThread(state = null, action) {
    switch (action.type) {
        case 'UPDATE_CURRENT_THREAD':
            return action.id
        default:
            return state
    }
}

function threads(state = {}, action) {
    switch (action.type) {
        case 'UPDATE_THREAD_CONTENTS':
            return Object.assign({}, state, Map().set(action.id, {
                title: action.info.title,
                parentGroup: action.info.parentGroup,
                user: action.info.user,
                postsMap: action.postsMap,
                postsList: action.postsList,
                insertedAt: action.info.inserted_at
            }).toJS())
        case 'RECEIVE_THREAD_CONTENTS':
            return Object.assign({}, state, Map().set(action.id, {
                postsMap: action.postsMap
            }).toJS())
        case 'ADD_THREAD_CONTENTS':
            return Object.assign({}, state, Map().set(action.id, Object.assign({}, state[action.id], {
                postsMap: action.postsMap,
                postsList: action.postsList
            })).toJS())
        default:
            return state
    }
}

function isFetchingThreadContents(state = {}, action) {
    switch (action.type) {
        case 'REQUEST_THREAD_CONTENTS':
            return Object.assign({}, state, Map().set(action.id, true).toJS())
        case 'UPDATE_THREAD_CONTENTS':
            return Object.assign({}, state, Map().set(action.id, false).toJS())
        case 'RECEIVE_THREAD_CONTENTS':
            return Object.assign({}, state, Map().set(action.id, false).toJS())
        default:
            return state
    }
}

function isFetchingMissingPosts(state = {}, action) {
    switch (action.type) {
        case 'REQUEST_MISSING_POSTS':
            return Object.assign({}, state, Map().set(action.id, true).toJS())
        case 'RECEIVE_MISSING_POSTS':
            return Object.assign({}, state, Map().set(action.id, false).toJS())
        default:
            return state
    }
}

export default threadsRoot

import { combineReducers } from 'redux'
import Immutable, { Map } from 'immutable'

const threadsRoot = combineReducers({
    tab,
    currentGroup, // id
    groups, // id => map
    isFetchingGroupThreads, // id => bool
    isFetchingMissingGroupThreads // id => bool
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

function tab(state = "threads", action) {
    switch (action.type) {
        case 'SWITCH_GROUP_PAGE_TAB':
            return action.tab
        default:
            return state
    }
}

function currentGroup(state = null, action) {
    switch (action.type) {
        case 'UPDATE_CURRENT_GROUP':
            return action.id
        default:
            return state
    }
}

function groups(state = {}, action) {
    switch (action.type) {
        case 'UPDATE_GROUP_THREADS':
            return Object.assign({}, state, Map().set(action.id, Object.assign({}, state[action.id] || {}, {
                threadsMap: action.threadsMap,
                threadsList: action.threadsList,
            })).toJS())
        case 'UPDATE_GROUP_INFO':
            return Object.assign({}, state, Map().set(action.id, Object.assign({}, state[action.id] || {}, {
                name: action.info.name,
                parentGroup: action.info.parentGroup,
                user: action.info.user,
                insertedAt: action.info.inserted_at
            })).toJS())
        case 'RECEIVE_GROUP_THREADS':
            return Object.assign({}, state, Map().set(action.id, Object.assign({}, state[action.id] || {}, {
                threadsMap: action.threadsMap
            })).toJS())
        case 'ADD_GROUP_THREADS':
            return Object.assign({}, state, Map().set(action.id, Object.assign({}, state[action.id] || {}, {
                threadsMap: action.threadsMap,
                threadsList: action.threadsList
            })).toJS())
        default:
            return state
    }
}

function isFetchingGroupInfo(state = {}, action) {
    switch (action.type) {
        case 'REQUEST_GROUP_INFO':
            return Object.assign({}, state, Map().set(action.id, true).toJS())
        case 'UPDATE_GROUP_INFO':
            return Object.assign({}, state, Map().set(action.id, false).toJS())
        default:
            return state
    }
}

function isFetchingGroupThreads(state = {}, action) {
    switch (action.type) {
        case 'REQUEST_GROUP_THREADS':
            return Object.assign({}, state, Map().set(action.id, true).toJS())
        case 'UPDATE_GROUP_THREADS':
            return Object.assign({}, state, Map().set(action.id, false).toJS())
        case 'RECEIVE_GROUP_THREADS':
            return Object.assign({}, state, Map().set(action.id, false).toJS())
        default:
            return state
    }
}

function isFetchingMissingGroupThreads(state = {}, action) {
    switch (action.type) {
        case 'REQUEST_MISSING_GROUP_THREADS':
            return Object.assign({}, state, Map().set(action.id, true).toJS())
        case 'RECEIVE_MISSING_GROUP_THREADS':
            return Object.assign({}, state, Map().set(action.id, false).toJS())
        default:
            return state
    }
}

export default threadsRoot

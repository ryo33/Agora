import { combineReducers } from 'redux'
import Immutable from 'immutable'

const initialInfo = {
    title: '',
    parent_group: {
        id: ''
    },
    user: {
        id: '',
        uid: '',
        name: ''
    }
}

const threads = combineReducers({
    info,
    posts,
    beforeId
})

function beforeId(state = null, action) {
    switch (action.type) {
        case 'SET_THREAD_CONTENTS':
            return action.info.id
        case 'RESET_THREAD_CONTENTS':
            return action.id
        default:
            return state
    }
}

function info(state = initialInfo, action) {
    switch (action.type) {
        case 'SET_THREAD_CONTENTS':
            return action.info
        default:
            return state
    }
}

function posts(state = [], action) {
    switch (action.type) {
        case 'SET_THREAD_CONTENTS':
            return action.posts
        case 'ADD_POST':
            return Immutable.fromJS(state).splice(0, 0, action.post).toJS()
        case 'RESET_THREAD_CONTENTS':
            return []
        default:
            return state
    }
}

export default threads

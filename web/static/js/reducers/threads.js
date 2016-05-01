import { combineReducers } from 'redux'
import Immutable from 'immutable'

const threads = combineReducers({
    posts
})

function posts(state = [], action) {
    switch (action.type) {
        case 'SET_THREAD_CONTENTS':
            return action.posts
        case 'ADD_POST':
            return Immutable.fromJS(state).splice(0, 0, action.post).toJS()
        default:
            return state
    }
}

export default threads

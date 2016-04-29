import { combineReducers } from 'redux'

const threads = combineReducers({
    posts
})

function posts(state = [], action) {
    switch (action.type) {
        case 'SET_THREAD_CONTENTS':
            return action.posts
        default:
            return state
    }
}

export default threads

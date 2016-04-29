const initialState = {
    name: ''
}

function addThread(state = initialState, action) {
    switch (action.type) {
        case 'SET_ADD_THREAD':
            return Object.assign({}, state, {
                name: action.name
            })
        default:
            return state
    }
}

export default addThread

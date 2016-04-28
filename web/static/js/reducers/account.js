const initialState = {
    users: [],
    threads: [],
    currentUser: null
}

function account(state = initialState, action) {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return Object.assign({}, state, {
                currentUser: action.id
            })
        case 'ADD_USER':
            return Object.assign({}, state, {
                users: state.users.concat([action.user])
            })
        case 'SET_USERS':
            return Object.assign({}, state, {
                users: action.users
            })
        case 'SET_CURRENT_USER':
            return Object.assign({}, state, {
                currentUser: action.userID
            })
        case 'ADD_THREADS':
            return Object.assign({}, state, {
                threads: [].push.apply(state.threads, action.threads)
            })
        default:
            return state
    }
}

export default account

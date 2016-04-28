const initialState = {
    users: [],
    currentUser: null
}

function account(state = initialState, action) {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return Object.assign({}, state, {
                currentUser: action.id
            })
        case 'ADD_USER':
            let user = {}
            user[action.id] = action.user
            return Object.assign({}, state, {
                users: Object.assign({}, state.users, user)
            })
        case 'SET_USERS':
            return Object.assign({}, state, {
                users: action.users
            })
        default:
            return state
    }
}

export default account

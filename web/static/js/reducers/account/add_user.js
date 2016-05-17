const initialState = {
  id: '',
  name: '',
};

function addUser(state = initialState, action) {
  switch (action.type) {
    case 'SET_ADD_USER':
      return Object.assign({}, state, {
        id: action.id,
        name: action.name,
      });
    default:
      return state;
  }
}

export default addUser;

import { combineReducers } from 'redux';
import addUser from './add_user';

const account = combineReducers({
  users,
  currentUser,
  forms: combineReducers({
    addUser,
  }),
});

function users(state = [], action) {
  switch (action.type) {
    case 'SET_USERS':
      return action.users;
    case 'ADD_USER':
      return state.concat([action.user]);
    default:
      return state;
  }
}

function currentUser(state = null, action) {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return action.user;
    default:
      return state;
  }
}

export default account;

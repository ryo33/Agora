import { createLogic } from 'redux-logic';

import { addUsers, addUserIDs } from 'actions/resources';

const addUserIDsLogic = createLogic({
  type: addUsers.getType(),
  process({ action }, dispatch) {
    const users = action.payload;
    const map = {};
    Object.keys(users).forEach(id => {
      const uid = users[id].uid;
      map[uid] = +id;
    })
    dispatch(addUserIDs(map));
  }
});

export default [addUserIDsLogic];

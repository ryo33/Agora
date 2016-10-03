import { createLogic } from 'redux-logic';

import threadPageLogics from 'logics/threadPage';
import groupPageLogics from 'logics/groupPage';
import resourcesLogics from 'logics/resources';

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

export default [addUserIDsLogic].concat(
  threadPageLogics,
  groupPageLogics,
  resourcesLogics
);

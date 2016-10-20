import { createLogic } from 'redux-logic'

import accountPageLogics from 'logics/accountPage'
import threadPageLogics from 'logics/threadPage'
import groupPageLogics from 'logics/groupPage'
import resourcesLogics from 'logics/resources'
import userFormLogics from 'logics/userForm'
import globalLogics from 'logics/global'

import { addUsers, addUserIDs } from 'actions/resources'

const addUserIDsLogic = createLogic({
  type: addUsers.getType(),
  process({ action }, dispatch) {
    const users = action.payload
    const map = {}
    Object.keys(users).forEach((id) => {
      const uid = users[id].uid
      map[uid] = +id
    })
    dispatch(addUserIDs(map))
  },
})

export default [addUserIDsLogic].concat(
  accountPageLogics,
  threadPageLogics,
  groupPageLogics,
  resourcesLogics,
  userFormLogics,
  globalLogics
)

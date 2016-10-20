import { createLogic } from 'redux-logic'

import { updateGroup } from 'actions/resources'
import {
  updateGroupGroups,
  updateGroupThreads,
  updateGroupMembers,
} from 'actions/groupPage'

const createGroupContentsUpdateLogic = (action, contentsKey) => {
  return createLogic({
    type: action.getType(),
    process({ action, getState }, dispatch) {
      const resources = action.payload
      const currentGroupID = getState().groupPage.currentGroup
      dispatch(updateGroup(currentGroupID, { [contentsKey]: resources.length }))
    },
  })
}

export default [
  createGroupContentsUpdateLogic(updateGroupGroups, 'groups'),
  createGroupContentsUpdateLogic(updateGroupThreads, 'threads'),
  createGroupContentsUpdateLogic(updateGroupMembers, 'members'),
]

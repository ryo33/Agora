import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'

import {
  updateCurrentGroup,
    switchGroupPageTabs,
    openAllGroupsPage, updateGroups,
    openGroupThreadsTab, updateGroupThreads,
    openGroupGroupsTab, updateGroupGroups,
    openGroupMembersTab, updateGroupMembers,
} from 'actions/groupPage'

const tab = createReducer({
  [switchGroupPageTabs]: (state, value) => value,
  [openGroupGroupsTab]: (state, value) => 'groups',
  [openGroupThreadsTab]: (state, value) => 'threads',
  [openGroupMembersTab]: (state, value) => 'members',
}, null)

const currentGroup = createReducer({
  [updateCurrentGroup]: (_, id) => id,
}, null)

const groups = createReducer({
  [updateGroups]: (_, ids) => ids,
}, [])

const groupThreads = createReducer({
  [updateGroupThreads]: (_, ids) => ids,
}, [])

const groupGroups = createReducer({
  [updateGroupGroups]: (_, ids) => ids,
}, [])

const groupMembers = createReducer({
  [updateGroupMembers]: (_, ids) => ids,
}, [])

const groupPage = combineReducers({
  currentGroup,
  tab,
  groups,
  groupGroups,
  groupMembers,
  groupThreads,
})

export default groupPage

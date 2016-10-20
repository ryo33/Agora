import { createLogic } from 'redux-logic'
import { getKey } from 'associative-reducer'
import { push } from 'react-router-redux'

import { accountChannel, commonChannel, pushMessage } from 'socket'
import {
  requestUserSuggestions,
  requestNewMemberSuggestions,
  requestThreadWebhookSuggestions,
  receiveSuggestedUsers,
} from 'actions/userForm'

const requestNewMemberSuggestionsLogic = createLogic({
  type: requestNewMemberSuggestions.getType(),
  process({ action }, dispatch) {
    const { value, groupID } = action.payload
    const key = getKey(action)
    if (value.trim().length >= 1) {
      const params = {
        query: value,
        group_id_to_join: groupID,
      }
      const { users } = pushMessage(commonChannel, 'users', 'search', params)
        .then(({ users }) => {
          dispatch(receiveSuggestedUsers(key, users))
        })
    } else {
      dispatch(receiveSuggestedUsers(key, []))
    }
  },
})

const requestThreadWebhookSuggestionsLogic = createLogic({
  type: requestThreadWebhookSuggestions.getType(),
  process({ action }, dispatch) {
    const { value, threadID } = action.payload
    const key = getKey(action)
    if (value.trim().length >= 1) {
      const params = {
        query: value,
        thread_id: threadID,
      }
      const { users } = pushMessage(commonChannel, 'users', 'search thread webhooks', params)
        .then(({ users }) => {
          dispatch(receiveSuggestedUsers(key, users))
        })
    } else {
      dispatch(receiveSuggestedUsers(key, []))
    }
  },
})

const requestUserSuggestionsLogic = createLogic({
  type: requestUserSuggestions.getType(),
  process({ action }, dispatch) {
    const { value } = action.payload
    const key = getKey(action)
    if (value.trim().length >= 1) {
      const params = {
        query: value,
      }
      const { users } = pushMessage(commonChannel, 'users', 'search', params)
        .then(({ users }) => {
          dispatch(receiveSuggestedUsers(key, users))
        })
    } else {
      dispatch(receiveSuggestedUsers(key, []))
    }
  },
})

export default [
  requestNewMemberSuggestionsLogic,
  requestThreadWebhookSuggestionsLogic,
  requestUserSuggestionsLogic,
]

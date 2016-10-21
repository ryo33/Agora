import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'

import {
  updateQuery,
  updateSearchItems,
} from 'actions/searchPage'

const query = createReducer({
  [updateQuery]: (_, id) => id,
}, null)

const items = createReducer({
  [updateSearchItems]: (_, items) => items.sort((a, b) => b.updated_at - a.updated_at), // desc
}, [])

const isFetching = createReducer({
  [updateQuery]: (state, payload) => true,
  [updateSearchItems]: (state, payload) => false
}, false)

const searchPage = combineReducers({
  query,
  items,
})

export default searchPage

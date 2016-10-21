import { createLogic } from 'redux-logic'

import { updateQuery, search, updateSearchItems, finishSearching } from 'actions/searchPage'
import { commonChannel, pushMessage } from 'socket'

const THROTTLE = 200

const searchLogic = createLogic({
  type: updateQuery.getType(),
  throttle: THROTTLE,
  process({ action, getState, cancelled$ }, dispatch) {
    cancelled$.subscribe(() => {
      dispatch(finishSearching(), { allowMore: true })
      dispatch()
    })
    const query = action.payload
    if (query.length > 0) {
      dispatch(search(), { allowMore: true })
      pushMessage(commonChannel, 'search', 'all', { query })
        .then(({ items }) => {
          dispatch(updateSearchItems(items), { allowMore: true })
          dispatch(finishSearching())
        })
    }
  },
})

export default [
  searchLogic,
]

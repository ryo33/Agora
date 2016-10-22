import { createLogic } from 'redux-logic'

import { setTitle } from 'actions/global'

const titleLogic = createLogic({
  type: setTitle.getType(),
  process({ action }) {
    const title = action.payload
    document.title = title
  },
})

export default [titleLogic]

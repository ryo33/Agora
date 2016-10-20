import { createAction } from 'redux-act'

export const receiveSuggestedUserExists = createAction('Receive suggested user exists', exists => exists)
export const updateNewUserFormQuery = createAction('Update user form query', value => ({ value }))

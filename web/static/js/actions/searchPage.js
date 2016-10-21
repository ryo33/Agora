import { createAction } from 'redux-act'

export const openSearchPage = createAction('Open search page')
export const closeSearchPage = createAction('Close search page')

export const updateQuery = createAction('Update search query', query => query)

export const search = createAction('Search')
export const finishSearching = createAction('Finish searching')
export const updateSearchItems = createAction('Update search items', items => items)

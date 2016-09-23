import { createAction } from 'redux-act';

export const showLoadingError = createAction('Show loading error', error => error);

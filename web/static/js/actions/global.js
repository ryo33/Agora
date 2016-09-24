import { createAction } from 'redux-act';

export const showLoadingError = createAction('Show loading error', error => error);

export const showInfo = createAction('Show info', info => info);
export const closeInfo = createAction('Close info');

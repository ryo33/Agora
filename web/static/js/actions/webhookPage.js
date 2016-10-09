import { createAction } from 'redux-act';

export const updateCurrentWebhook = createAction('Update current webhook', id => id);
export const openWebhookPage = createAction('Open webhook page', id => id);
export const closeWebhookPage = createAction('Close webhook page');

export const openAllWebhooksPage = createAction('Open all webhooks page');
export const updateWebhooks = createAction('Update webhooks');

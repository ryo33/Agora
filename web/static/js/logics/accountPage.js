import { createLogic } from 'redux-logic';

import { openAccountWebhooksPage, updateWebhooks } from 'actions/accountPage';
import { accountChannel, pushMessage } from 'socket';

const fetchWebhooksLogic = createLogic({
  type: openAccountWebhooksPage.getType(),
  process({ action, getState }, dispatch) {
    pushMessage(accountChannel, 'webhooks', 'get by account')
      .then(({ webhooks }) => {
        dispatch(updateWebhooks(webhooks));
      });
  }
});

export default [
  fetchWebhooksLogic
];

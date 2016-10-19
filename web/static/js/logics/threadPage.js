import { createLogic } from 'redux-logic';

import { commonChannel, pushMessage } from 'socket';
import { updateThread } from 'actions/resources';
import {
  updateThreadPosts,
  updateWebhooks,
  openThreadWebhooksPage,
} from 'actions/threadPage';

const postIDsLogic = createLogic({
  type: updateThreadPosts.getType(),
  process({ action, getState }, dispatch) {
    const posts = action.payload;
    const currentThreadID = getState().threadPage.currentThread;
    dispatch(updateThread(currentThreadID, { posts: posts.length }));
  }
});

const fetchWebhooksLogic = createLogic({
  type: openThreadWebhooksPage.getType(),
  process({ action }, dispatch) {
    const threadID = action.payload;
    pushMessage(commonChannel, 'webhooks', 'get by thread', { thread_id: threadID })
      .then(({ links }) => {
        dispatch(updateWebhooks(links));
      });
  }
});

export default [
  postIDsLogic,
  fetchWebhooksLogic
];

import { createLogic } from 'redux-logic';

import { updateThread } from 'actions/resources';
import { updateThreadPosts } from 'actions/threadPage';

const postIDsLogic = createLogic({
  type: updateThreadPosts.getType(),
  process({ action, getState }, dispatch) {
    const posts = action.payload;
    const currentThreadID = getState().threadPage.currentThread;
    dispatch(updateThread(currentThreadID, { posts: posts.length }));
  }
});

export default [
  postIDsLogic
];

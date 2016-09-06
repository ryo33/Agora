import { createAction } from 'redux-actions'

export const openThreadPage = createAction("open thread page", id => ({ id }))
export const closeThreadPage = createAction("close thread page", id => ({ id }))
export const updateCurrentThread = createAction("update current thread", id => ({ id }))

export const addThreadContents = createAction("add thread contents", (id, postsMap, postsList) => ({
  id, postsMap, postsList
}))

export const requestThreadContents = createAction("request thread contents", id => id)

export function requestMissingPosts(id) {
  return {
    type: 'REQUEST_MISSING_POSTS',
    id,
  };
}

export const updateThreadContents = createAction("update thread contents", (id, info, postsMap, postsList) => ({
  id, info, postsMap, postsList
}))

export function receiveMissingPosts(id, postsMap) {
  return {
    type: 'RECEIVE_MISSING_POSTS',
    id, postsMap,
  };
}

export function fetchMissingPosts(id, ids) {
  return (dispatch) => {
    dispatch(requestMissingPosts(id));
    window.threadChannel.push('post', { action: 'fetch_posts', params: { ids } })
        .receive('ok', ({ posts }) => {
          const postsMap = {};
          posts.forEach(({ pid, title, text, user, post_id }) => {
            postsMap[pid] = { title, text, user, post_id };
          });
          dispatch(receiveMissingPosts(id, postsMap));
        });
  };
}

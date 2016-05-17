export function addThreadContents(id, postsMap, postsList) {
  return {
    type: 'ADD_THREAD_CONTENTS',
    id, postsMap, postsList,
  };
}

export function updateCurrentThread(id) {
  return {
    type: 'UPDATE_CURRENT_THREAD',
    id,
  };
}

export function requestThreadContents(id) {
  return {
    type: 'REQUEST_THREAD_CONTENTS',
    id,
  };
}

export function requestMissingPosts(id) {
  return {
    type: 'REQUEST_MISSING_POSTS',
    id,
  };
}

export function updateThreadContents(id, info, postsMap, postsList) {
  return {
    type: 'UPDATE_THREAD_CONTENTS',
    id, info, postsMap, postsList,
  };
}

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

export function receivePosts(id, postsMap, postsList) {
  return (dispatch, getState) => {
    const threads = getState().threads;
    const thread = threads.threads[id] || {};
    const newPostMap = Object.assign({}, thread.postsMap || {}, postsMap);
    dispatch(addThreadContents(id, newPostMap, postsList));
    const missingIDs = [];
    postsList.forEach((postID) => {
      if (!(postID in newPostMap)) {
        missingIDs.push(postID);
      }
    });
    if (missingIDs.length > 0) {
      dispatch(fetchMissingPosts(missingIDs));
    }
  };
}

export function receiveThreadContents(id, info, postsMap, postsList) {
  return (dispatch, getState) => {
    const threads = getState().threads;
    const thread = threads.threads[id] || {};
    const newPostMap = Object.assign({}, thread.postsMap || {}, postsMap);
    dispatch(updateThreadContents(id, info, newPostMap, postsList));
    const missingIDs = [];
    postsList.forEach((postID) => {
      if (!(postID in newPostMap)) {
        missingIDs.push(postID);
      }
    });
    if (missingIDs.length > 0) {
      dispatch(fetchMissingPosts(missingIDs));
    }
  };
}

export function fetchThreadContents(id) {
  return (dispatch) => {
    dispatch(requestThreadContents(id));
    window.threadChannel.push('post', {
      action: 'fetch_thread_contents',
      params: { id },
    }).receive('ok', ({ thread, posts }) => {
      const postsMap = {};
      const postsList = [];
      posts.forEach(({ pid, title, text, user, post_id, inserted_at, updated_at }) => {
        postsMap[pid] = { title, text, user, post_id, inserted_at, updated_at };
        postsList.push(pid);
      });
      dispatch(receiveThreadContents(id, thread, postsMap, postsList));
    });
  };
}

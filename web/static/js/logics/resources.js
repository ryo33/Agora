import { createLogic } from 'redux-logic';
import { push } from 'react-router-redux';

import { commonChannel, pushMessage } from 'socket';
import {
  submitGroup, submitThread,
  editThread, editGroup,
  updateThread, updateGroup
} from 'actions/resources';

function formatGroupParams(params) {
  const {
    group, user, name, groupLimited, threadLimited, joinLimited
  } = params;
  return {
    parent_group_id: group,
    user_id: user,
    name: name,
    group_limited: groupLimited,
    thread_limited: threadLimited,
    join_limited: joinLimited
  };
}

function formatThreadParams(params) {
  const {
    group, user, title, postLimited
  } = params;
  return {
    parent_group_id: group,
    user_id: user,
    title: title,
    post_limited: postLimited
  };
}

const addGroupLogic = createLogic({
  type: submitGroup.getType(),
  process({ action }, dispatch) {
    const params = formatGroupParams(action.payload);
    pushMessage(commonChannel, 'groups', 'add', params)
      .then(({ id }) => {
        dispatch(push('/groups/' + id))
      });
  }
});

const addThreadLogic = createLogic({
  type: submitThread.getType(),
  process({ action }, dispatch) {
    const params = formatThreadParams(action.payload);
    pushMessage(commonChannel, 'threads', 'add', params)
      .then(({ id }) => {
        dispatch(push('/threads/' + id))
      })
  }
});

const editGroupLogic = createLogic({
  type: editGroup.getType(),
  process({ action }, dispatch) {
    const { id, params: rawParams } = action.payload;
    const params = formatGroupParams(rawParams);
    pushMessage(commonChannel, 'groups', 'edit', { id, params })
      .then(({ group }) => {
        dispatch(updateGroup(group.id, group));
      });
  }
});

const editThreadLogic = createLogic({
  type: editThread.getType(),
  process({ action }, dispatch) {
    const { id, params: rawParams } = action.payload;
    const params = formatThreadParams(rawParams);
    pushMessage(commonChannel, 'threads', 'edit', { id, params })
      .then(({ thread }) => {
        dispatch(updateThread(thread.id, thread));
      });
  }
});

export default [
  addGroupLogic,
  addThreadLogic,
  editGroupLogic,
  editThreadLogic
];

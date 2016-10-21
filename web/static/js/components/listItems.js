import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { compose } from 'recompose'
import ellipsize from 'ellipsize'

import RaisedButton from 'material-ui/RaisedButton'

import { GroupIcon, ThreadIcon, PostIcon, UserIcon } from 'components/icons'
import ListItem from 'components/ListItem'
import GroupButton from 'components/GroupButton'
import ThreadButton from 'components/ThreadButton'
import {
  requireGroup, requireThread, requirePost, requireUser,
  checkGroupOwned, checkThreadOwned, checkPostOwned, checkUserOwned,
} from 'hocs/resources'

const styles = {
  parent: {
    marginRight: '5px',
  },
  childIcon: {
    margin: '0px 5px',
  },
}

const MAX_POST_LENGTH = 256
const MAX_BUTTON_TEXT = 20

const actionCreators = { push }

const Group = compose(requireGroup(null, actionCreators), checkGroupOwned)(({ id, isOwned, group, push }) => {
  const click = () => push(`/groups/${id}`)
  const parentID = group.parent_group_id
  return (
    <ListItem isOwned={isOwned} handleClick={click}>
      { parentID ? <GroupButton id={parentID} style={styles.parent} /> : null }
      <GroupIcon style={styles.childIcon} />{group.name}
    </ListItem>
  )
})

const Thread = compose(requireThread(null, actionCreators), checkThreadOwned)(({ id, isOwned, thread, push }) => {
  const click = () => push(`/threads/${id}`)
  const parentID = thread.parent_group_id
  return (
    <ListItem isOwned={isOwned} handleClick={click}>
      { parentID ? <GroupButton id={thread.parent_group_id} style={styles.parent} /> : null }
      <ThreadIcon style={styles.childIcon} />{thread.title}
    </ListItem>
  )
})

const Post = compose(requirePost(null, actionCreators), checkPostOwned)(({ id, isOwned, post, push }) => {
  const click = () => push(`/threads/${post.thread_id}`)
  return (
    <ListItem isOwned={isOwned} handleClick={click}>
      <ThreadButton id={post.thread_id} style={styles.parent} /><strong>{post.title}</strong>
      <PostIcon style={styles.childIcon} />{ellipsize(post.text, MAX_POST_LENGTH)}
    </ListItem>
  )
})

const Member = compose(requireUser(null, actionCreators), checkUserOwned)(({ id, isOwned, user, group, push }) => {
  const click = () => push(`/users/${user.uid}`)
  return (
    <ListItem isOwned={isOwned} handleClick={click}>
      <GroupButton id={group} style={styles.parent} />
      <UserIcon style={styles.childIcon} />{user.name}@{user.uid}
    </ListItem>
  )
})

const User = compose(requireUser(null, actionCreators), checkUserOwned)(({ id, isOwned, user, push }) => {
  const click = () => push(`/users/${user.uid}`)
  return (
    <ListItem isOwned={isOwned} handleClick={click}>
      <UserIcon style={styles.childIcon} />{user.name}@{user.uid}
    </ListItem>
  )
})

export { Group, Thread, Post, Member, User }

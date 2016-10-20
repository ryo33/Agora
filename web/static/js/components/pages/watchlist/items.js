import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { compose } from 'recompose'
import ellipsize from 'ellipsize'

import RaisedButton from 'material-ui/RaisedButton'

import { GroupIcon, ThreadIcon, PostIcon, UserIcon } from 'components/icons'
import ListItem from 'components/ListItem'
import ParentGroup from 'components/ParentGroup'
import ParentThread from 'components/ParentThread'
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
  return (
    <ListItem isOwned={isOwned} handleClick={click}>
      <ParentGroup id={group.parent_group_id} style={styles.parent} />
      <GroupIcon style={styles.childIcon} />{group.name}
    </ListItem>
  )
})

const Thread = compose(requireThread(null, actionCreators), checkThreadOwned)(({ id, isOwned, thread, push }) => {
  const click = () => push(`/threads/${id}`)
  return (
    <ListItem isOwned={isOwned} handleClick={click}>
      <ParentGroup id={thread.parent_group_id} style={styles.parent} />
      <ThreadIcon style={styles.childIcon} />{thread.title}
    </ListItem>
  )
})

const Post = compose(requirePost(null, actionCreators), checkPostOwned)(({ id, isOwned, post, push }) => {
  const click = () => push(`/threads/${post.thread_id}`)
  return (
    <ListItem isOwned={isOwned} handleClick={click}>
      <ParentThread id={post.thread_id} style={styles.parent} /><strong>{post.title}</strong>
      <PostIcon style={styles.childIcon} />{ellipsize(post.text, MAX_POST_LENGTH)}
    </ListItem>
  )
})

const Member = compose(requireUser(null, actionCreators), checkUserOwned)(({ id, isOwned, user, group, push }) => {
  const click = () => push(`/users/${user.uid}`)
  return (
    <ListItem isOwned={isOwned} handleClick={click}>
      <ParentGroup id={group} style={styles.parent} />
      <UserIcon style={styles.childIcon} />{user.name}@{user.uid}
    </ListItem>
  )
})

export { Group, Thread, Post, Member }

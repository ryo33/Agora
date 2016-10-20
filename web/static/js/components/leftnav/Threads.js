import React, { Component } from 'react'
import { connect } from 'react-redux'

import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'

import ThreadTitle from 'components/ThreadTitle'
import { AddBoxIcon, ThreadIcon } from 'components/icons/index'
import { signedIn } from 'global'

const mapStateToProps = ({ threadHistory }) => {
  return {
    threadHistory,
  }
}

const menuItems = [
  {
    children: 'All Threads',
    leftIcon: <ThreadIcon />,
    path: '/threads',
  },
  {
    signedIn: true,
    children: 'All Your Threads',
    leftIcon: <ThreadIcon />,
    path: '/account/threads',
  },
  {
    signedIn: true,
    children: 'Create a New Thread',
    leftIcon: <AddBoxIcon />,
    path: '/account/add-thread',
  },
]

const Threads = (props) => {
  const { threadHistory, click } = props
  const history = threadHistory.map(id => <MenuItem
    children={<ThreadTitle id={id} />}
    onClick={click(`/threads/${id}`)}
  />)
  if (threadHistory.length != 0) {
    history.unshift(<Divider />)
  }
  return (<MenuItem
    children="Threads"
    menuItems={
      menuItems.map(({ children, leftIcon, path, signedIn: only }) => (
        <MenuItem
          children={children}
          leftIcon={leftIcon}
          onClick={props.click(path, only)}
          disabled={only && !signedIn}
        />
      )).filter(mi => mi != null).concat(history)
    }
    rightIcon={<ArrowDropRight />}
    leftIcon={<ThreadIcon />}
  />) }

export default connect(mapStateToProps)(Threads)

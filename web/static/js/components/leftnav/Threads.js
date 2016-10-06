import React, { Component } from 'react';
import { connect } from 'react-redux';

import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import { AddBoxIcon, ThreadIcon } from 'components/icons/index';
import { signedIn } from 'global';

let menuItems = [
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
];


const Threads = (props) => <MenuItem
  children="Threads"
  menuItems={
    menuItems.map(({ children, leftIcon, path, signedIn: only }) => (
      <MenuItem
        children={children}
        leftIcon={leftIcon}
        onClick={props.click(path, only)}
        disabled={only && !signedIn}
      />
    )).filter(mi => mi != null)
  }
  rightIcon={<ArrowDropRight />}
  leftIcon={<ThreadIcon />}
/>;

export default Threads;

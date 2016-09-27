import React, { Component } from 'react';
import { connect } from 'react-redux';

import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import { AddBoxIcon, GroupIcon } from 'components/icons/index';
import { SignedIn } from 'components/util';

let menuItems = [
  {
    children: "All Groups",
    leftIcon: <GroupIcon />,
    path: '/groups'
  },
  {
    signedIn: true,
    children: "All Your Groups",
    leftIcon: <GroupIcon />,
    path: '/account/groups'
  },
  {
    signedIn: true,
    children: "Create New Group",
    leftIcon: <AddBoxIcon />,
    path: '/account/add-group'
  },
];


const Groups = (props) => (
  <MenuItem
    children="Groups"
    menuItems={menuItems.map(({ children, leftIcon, path, signedIn }) =>
        !signedIn || window.signedIn
      ? <MenuItem
        children={children}
        leftIcon={leftIcon}
        onClick={props.click(path)}
      />
      : null).filter(mi => mi != null)}
      rightIcon={<ArrowDropRight />}
      leftIcon={<GroupIcon />}
    />
);

export default Groups;

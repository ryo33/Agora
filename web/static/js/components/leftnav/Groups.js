import React, { Component } from 'react';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import GroupTitle from 'components/GroupTitle';
import { AddBoxIcon, GroupIcon } from 'components/icons/index';
import { signedIn } from 'global';

const mapStateToProps = ({ groupHistory }) => {
  return {
    groupHistory,
  };
};

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
    children: "Create a New Group",
    leftIcon: <AddBoxIcon />,
    path: '/account/add-group'
  },
];

const Groups = (props) => {
  const { groupHistory, click } = props;
  const history = groupHistory.map((id) => <MenuItem
    children={<GroupTitle id={id} />}
    onClick={click('/groups/' + id)}
  />)
  if (groupHistory.length != 0) {
    history.unshift(<Divider />);
  }
  return (<MenuItem
    children="Groups"
    menuItems={
      menuItems.map(({ children, leftIcon, path, signedIn: only }) =>
          <MenuItem
            children={children}
            leftIcon={leftIcon}
            onClick={props.click(path, only)}
            disabled={only && !signedIn}
          />
      ).filter(mi => mi != null).concat(history)
    }
    rightIcon={<ArrowDropRight />}
    leftIcon={<GroupIcon />}
/>)};

export default connect(mapStateToProps)(Groups);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import { signedIn } from 'global';

const Users = (props) => <MenuItem
  disabled={!signedIn}
  children="Users"
  onClick={props.transitionTo('/account/users', true)}
  leftIcon={
    <FontIcon
      children="person"
      className="material-icons"
    />
  }
/>;

export default Users;

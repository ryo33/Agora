import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import SvgIcon from 'material-ui/SvgIcon';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { getAccountUsers, getCurrentUser } from 'selectors/accountPage';

const mapStateToProps = (state) => {
  return {
    users: getAccountUsers(state),
    currentUser: getCurrentUser(state)
  };
};

class UserSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beforeCurrentUser: props.currentUser
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.props.changeUser(value);
  }

  render() {
    const { user } = this.props;
    return (<SelectField
      value={user}
      onChange={this.handleChange}
    >
      {this.props.users.map(({ uid, name, id }, key) => <MenuItem
        key={key}
        value={id}
        secondaryText={uid}
        primaryText={name}
      />)}
    </SelectField>);
  }
}

export default connect(mapStateToProps)(UserSelector);

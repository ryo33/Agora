import React, { Component } from 'react';
import { connect } from 'react-redux';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { getAccountUsers, getCurrentUser } from 'selectors/accountPage';

const mapStateToProps = (state, { members }) => {
  let users = getAccountUsers(state);
  if (Array.isArray(members)) {
    users = users.filter((user) => members.includes(user.id));
  }
  return {
    users,
    currentUser: getCurrentUser(state),
    theme: state.theme
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

  componentWillMount() {
    const { user, users } = this.props;
    this.checkUser(users, user);
  }

  componentWillReceiveProps(props) {
    const { user, users } = props;
    this.checkUser(users, user);
  }

  checkUser(users, user) {
    if (user != null && users.findIndex(({ id }) => id == user) == -1) {
      this.props.changeUser(null);
    }
  }

  render() {
    const { user, users, theme } = this.props;

    if (Object.keys(users).length > 0) {
      return (
          <SelectField
            value={user}
            style={{float: "right"}}
            labelStyle={theme.form.dialog.userSelecter.label}
            onChange={this.handleChange}
          >
            <MenuItem
              value={null}
              style={theme.form.dialog.userSelecter.label}
              primaryText="Select A User"
            />
            {users.map(({ uid, name, id }, key) => <MenuItem
              key={key}
              value={id}
              style={theme.form.dialog.userSelecter.label}
              secondaryText={uid}
              primaryText={name}
            />)}
          </SelectField>
      );
    } else {
      return (
        <span>There is no permitted users.</span>
      )
    }
  }
}

export default connect(mapStateToProps)(UserSelector);

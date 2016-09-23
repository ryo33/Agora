import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';

import { updateCurrentUser } from 'actions/accountPage';
import { getAccountUsers, getCurrentUser } from 'selectors/accountPage';

const mapStateToProps = (state) => {
  return {
    users: getAccountUsers(state),
    currentUser: getCurrentUser(state)
  };
};

const actionCreators = {
  updateCurrentUser, push
};

class UserList extends Component {
  setCurrentUser(id) {
    return () => {
      const { updateCurrentUser } = this.props;
      updateCurrentUser(id);
    };
  }

  render() {
    let users = [];
    let currentUser = (<ListItem
      primaryText="No Current User"
      disabled
    />);
    const { push } = this.props;
    if (this.props.users) {
      this.props.users.forEach(({ uid, name, id }, key) => {
        if (id == this.props.currentUser) {
          currentUser = (<ListItem
            key={key}
            secondaryText={uid}
            primaryText={name}
            leftAvatar={<Avatar src="/images/phoenix.png" />}
          />);
        } else {
          users.push(<ListItem
            key={key}
            secondaryText={uid}
            primaryText={name}
            leftAvatar={<Avatar src="/images/phoenix.png" />}
            onClick={this.setCurrentUser(id)}
          />);
        }
      });
    }
    return (<div>
      <List>
        <Subheader>Current User</Subheader>
        {currentUser}
      </List>
      <Divider />
      <List>
        <Subheader>Users</Subheader>
        {users}
      </List>
      <Divider />
      <List>
        <ListItem primaryText="Add New User"
          leftIcon={<FontIcon
            children="add_box"
            className="material-icons"
          />}
          onClick={() => push('/account/add-user')}
        />
      </List>
    </div>);
  }
}

export default connect(mapStateToProps, actionCreators)(UserList);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Map } from 'immutable';

import TextField from 'material-ui/TextField';
import { Card, CardActions, CardHeader,
  CardMedia, CardTitle, CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';

import User from 'components/User';
import UserSelector from 'components/UserSelector';

import { addUserForm, unmountUserForm,
  updateUserFormQuery, updateUserFormSelected
} from 'actions/userForm';

const SelectedUser = ({ id }) => <User id={id} />;

const SuggestForm = ({
  query, onChange, suggestedUsers, dispatch, group,
  updateUserFormSelected
}) => (
  <div>
    <TextField
      hintText="Name or ID"
      floatingLabelText="Name or ID"
      value={query}
      onChange={onChange}
    />
    { suggestedUsers.map(id => <User
      key={id}
      id={id}
      onClick={() => updateUserFormSelected(group, id)}
    />)}
  </div>
)

const mapStateToProps = ({ account, userForm, groups }, { members, group }) => {
  const { query="", suggestedUsers=[], selectedUser=null } = userForm[group] || {};
  if (groups[group] == null) {
    members = [];
  } else if (groups[group].join_limited != true) {
    members = null;
  }
  return {
    currentUser: account.currentUser,
    query, suggestedUsers, selectedUser,
    members
  };
};

const actionCreators = {
  addUserForm, unmountUserForm,
  updateUserFormQuery, updateUserFormSelected 
};

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.currentUser,
    };
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSelectedChange = this.handleSelectedChange.bind(this);
    this.cancel = this.cancel.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    const { addUserForm, group } = this.props;
    addUserForm(group);
  }

  componentWillUnmount() {
    const { unmountUserForm, group } = this.props;
    unmountUserForm(group);
  }

  handleQueryChange(event) {
    const value = event.target.value;
    const { updateUserFormQuery, group } = this.props;
    updateUserFormQuery(group, value, group);
  }

  handleSelectedChange(event) {
    const value = event.target.value;
    const { updateUserFormSelected, group } = this.props;
    updateUserFormSelected(group, user);
  }

  submit() {
    const { updateUserFormQuery, updateUserFormSelected,
      group, submit, selectedUser } = this.props;
    submit({
      user: selectedUser,
    });
    updateUserFormSelected(group, null);
    updateUserFormQuery(group, '');
  }

  cancel() {
    const { updateUserFormSelected, group } = this.props;
    updateUserFormSelected(group, null);
  }

  changeUser(user) {
    this.setState(Object.assign({}, this.state, {user: user}));
  }

  render() {
    const {
      members, query, suggestedUsers, selectedUser, updateUserFormSelected, group
    } = this.props;
    const { user } = this.state;
    const notSelected = !selectedUser
    const disabled = user == null || notSelected;
    return (
      <Card>
        <CardTitle title={this.props.title} />
        <CardText>
          {
            selectedUser
              ? <SelectedUser id={selectedUser} />
              : <SuggestForm
                query={query}
                onChange={this.handleQueryChange}
                suggestedUsers={suggestedUsers}
                updateUserFormSelected={updateUserFormSelected}
                group={group}
              />
          }
        </CardText>
        <CardActions>
          <RaisedButton
            label="Submit"
            primary={true}
            onClick={this.submit}
            disabled={disabled}
          />
          <RaisedButton
            label="Cancel"
            secondary={true}
            onClick={this.cancel}
            disabled={notSelected}
          />
          <UserSelector
            user={this.state.user}
            members={members}
            changeUser={this.changeUser}
          />
        </CardActions>
      </Card>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(UserForm);

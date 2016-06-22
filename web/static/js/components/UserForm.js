import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Map } from 'immutable';
import { attachKey } from 'associative-reducer';

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
} from 'actions/user_form';

const SelectedUser = ({ user }) => <User user={user} />

const SuggestForm = ({ query, onChange, suggestedUsers, dispatch, groupID }) => (
  <div>
    <TextField
      hintText="Name or ID"
      floatingLabelText="Name or ID"
      value={query}
      onChange={onChange}
    />
    { suggestedUsers.map(user => <User
      key={user.id}
      user={user}
      onClick={() => dispatch(attachKey(updateUserFormSelected(user), groupID))}
    />)}
  </div>
)

const mapStateToProps = ({ account, userForm }, { groupID }) => {
  const { query, suggestedUsers, selectedUser } = userForm[groupID] || {};
  return {
    currentUser: account.currentUser,
    query, suggestedUsers, selectedUser
  };
}

class UserForm extends Component {
  constructor(props) {
    super(props);
    const { dispatch, groupID } = this.props;
    dispatch(attachKey(addUserForm(), groupID));
    this.state = {
      user: this.props.currentUser,
    };
  }

  componentWillMount() {
    const { dispatch, groupID } = this.props;
    dispatch(attachKey(addUserForm(), groupID));
  }

  componentWillUnmount() {
    const { dispatch, groupID } = this.props;
    dispatch(attachKey(unmountUserForm(), groupID));
  }

  handleQueryChange(event) {
    const value = event.target.value;
    const { dispatch, groupID } = this.props;
    dispatch(attachKey(updateUserFormQuery(value, groupID), groupID));
  }

  handleSelectedChange(event) {
    const value = event.target.value;
    const { dispatch, groupID } = this.props;
    dispatch(attachKey(updateUserFormSelected(user), groupID));
  }

  submit() {
    console.log('submit')
    const { dispatch, groupID, submit, selectedUser } = this.props;
    submit({
      user_id: selectedUser.id,
    });
    dispatch(attachKey(updateUserFormSelected(null), groupID));
    dispatch(attachKey(updateUserFormQuery('', groupID), groupID));
  }

  cancel() {
    const { dispatch, groupID } = this.props;
    dispatch(attachKey(updateUserFormSelected(null), groupID));
  }

  changeUser(user) {
    this.setState(Object.assign({}, this.state, {user: user}));
  }

  render() {
    const { query, suggestedUsers, selectedUser, dispatch, groupID } = this.props
    return typeof query !== 'undefined' ? (
      <Card>
        <CardTitle title={this.props.title} />
        <CardText>
          {
            selectedUser
              ? <SelectedUser user={selectedUser} />
              : <SuggestForm
                query={query}
                onChange={this.handleQueryChange.bind(this)}
                suggestedUsers={suggestedUsers}
                dispatch={dispatch}
                groupID={groupID}
              />
          }
        </CardText>
        <CardActions>
          <RaisedButton
            label="Submit"
            primary={true}
            onClick={this.submit.bind(this)}
            disabled={!selectedUser}
          />
          <RaisedButton
            label="Cancel"
            secondary={true}
            onClick={this.cancel.bind(this)}
            disabled={!selectedUser}
          />
          <UserSelector
            user={this.state.user}
            changeUser={this.changeUser.bind(this)}
          />
        </CardActions>
      </Card>
    ) : null;
  }
}

export default connect(mapStateToProps)(UserForm);

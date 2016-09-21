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
  query, onChange, suggestedUsers, dispatch, groupID,
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
      onClick={() => updateUserFormSelected(groupID, id)}
    />)}
  </div>
)

const mapStateToProps = ({ account, userForm }, { groupID }) => {
  const { query="", suggestedUsers=[], selectedUser=null } = userForm[groupID] || {};
  return {
    currentUser: account.currentUser,
    query, suggestedUsers, selectedUser
  };
};

const actionCreators = {
  addUserForm, unmountUserForm,
  updateUserFormQuery, updateUserFormSelected 
};

class UserForm extends Component {
  constructor(props) {
    super(props);
    const { addUserForm, groupID } = this.props;
    addUserForm(groupID);
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
    const { addUserForm, groupID } = this.props;
    addUserForm(groupID);
  }

  componentWillUnmount() {
    const { unmountUserForm, groupID } = this.props;
    unmountUserForm(groupID);
  }

  handleQueryChange(event) {
    const value = event.target.value;
    const { updateUserFormQuery, groupID } = this.props;
    updateUserFormQuery(groupID, value, groupID);
  }

  handleSelectedChange(event) {
    const value = event.target.value;
    const { updateUserFormSelected, groupID } = this.props;
    updateUserFormSelected(groupID, user);
  }

  submit() {
    const { updateUserFormQuery, updateUserFormSelected,
      groupID, submit, selectedUser } = this.props;
    submit({
      user: selectedUser,
    });
    updateUserFormSelected(groupID, null);
    updateUserFormQuery(groupID, '');
  }

  cancel() {
    const { updateUserFormSelected, groupID } = this.props;
    updateUserFormSelected(groupID, null);
  }

  changeUser(user) {
    this.setState(Object.assign({}, this.state, {user: user}));
  }

  render() {
    const {
      query, suggestedUsers, selectedUser, updateUserFormSelected, groupID
    } = this.props
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
                groupID={groupID}
              />
          }
        </CardText>
        <CardActions>
          <RaisedButton
            label="Submit"
            primary={true}
            onClick={this.submit}
            disabled={!selectedUser}
          />
          <RaisedButton
            label="Cancel"
            secondary={true}
            onClick={this.cancel}
            disabled={!selectedUser}
          />
          <UserSelector
            user={this.state.user}
            changeUser={this.changeUser}
          />
        </CardActions>
      </Card>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(UserForm);

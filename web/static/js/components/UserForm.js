import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Map } from 'immutable'

import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader,
  CardMedia, CardTitle, CardText,
} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List'

import User from 'components/User'
import UserSelector from 'components/UserSelector'

import { addUserForm, unmountUserForm,
  updateUserFormQuery, updateUserFormSelected, resetUserForm,
} from 'actions/userForm'

const SelectedUser = ({ id }) => <User id={id} />

const SuggestForm = ({
  query, onChange, suggestedUsers, dispatch, uniqueKey,
  updateUserFormSelected,
}) => (
  <div>
    <TextField
      hintText="Name or ID"
      floatingLabelText="Name or ID"
      value={query}
      onChange={onChange}
    />
    {
      suggestedUsers.map(id => <User
        key={id}
        id={id}
        onClick={() => updateUserFormSelected(uniqueKey, id)}
      />)
    }
  </div>
)

const mapStateToProps = ({ account, userForm, groups }, { members, uniqueKey, groupID }) => {
  const { query = '', suggestedUsers = [], selectedUser = null } = userForm[uniqueKey] || {}
  if (groupID) {
    const group = groups[groupID]
    if (group == null) {
      members = []
    } else if (group.join_limited != true) {
      members = null
    }
  }
  return {
    currentUser: account.currentUser,
    query, suggestedUsers, selectedUser,
    members,
  }
}

const actionCreators = {
  addUserForm, unmountUserForm, updateUserFormQuery,
  updateUserFormSelected, resetUserForm,
}

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.currentUser,
    }
    this.handleQueryChange = this.handleQueryChange.bind(this)
    this.handleSelectedChange = this.handleSelectedChange.bind(this)
    this.cancel = this.cancel.bind(this)
    this.changeUser = this.changeUser.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentWillMount() {
    const { addUserForm, uniqueKey } = this.props
    addUserForm(uniqueKey)
  }

  componentWillUnmount() {
    const { unmountUserForm, uniqueKey } = this.props
    unmountUserForm(uniqueKey)
  }

  handleQueryChange(event) {
    const value = event.target.value
    const { updateUserFormQuery, onChange, uniqueKey } = this.props
    updateUserFormQuery(uniqueKey, value)
    onChange(value)
  }

  handleSelectedChange(event) {
    const value = event.target.value
    const { updateUserFormSelected, uniqueKey } = this.props
    updateUserFormSelected(uniqueKey, user)
  }

  submit() {
    const { resetUserForm, uniqueKey, submit, selectedUser } = this.props
    const { user } = this.state
    submit({
      user: selectedUser,
      selector: user,
    })
    resetUserForm(uniqueKey)
  }

  cancel() {
    const { updateUserFormSelected, uniqueKey } = this.props
    updateUserFormSelected(uniqueKey, null)
  }

  changeUser(user) {
    this.setState(Object.assign({}, this.state, { user }))
  }

  render() {
    const {
      members, query, suggestedUsers, selectedUser, updateUserFormSelected, uniqueKey,
    } = this.props
    const { user } = this.state
    const notSelected = !selectedUser
    const disabled = user == null || notSelected
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
                uniqueKey={uniqueKey}
              />
          }
        </CardText>
        <CardActions>
          <RaisedButton
            label="Submit"
            primary
            onClick={this.submit}
            disabled={disabled}
          />
          <RaisedButton
            label="Cancel"
            secondary
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
    )
  }
}

export default connect(mapStateToProps, actionCreators)(UserForm)

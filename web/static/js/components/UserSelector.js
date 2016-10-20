import React, { Component } from 'react'
import { connect } from 'react-redux'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import { getAccountUsers, getCurrentUser } from 'selectors/accountPage'

const mapStateToProps = (state, { members }) => {
  let users = getAccountUsers(state)
  if (Array.isArray(members)) {
    users = users.filter(user => members.includes(user.id))
  }
  return {
    users,
  }
}

class UserSelector extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.user = null
  }

  handleChange(event, index, value) {
    this.props.changeUser(value)
  }

  componentWillMount() {
    const { user, users } = this.props
    this.ensureDefaultUser()
    this.checkUser(users, user)
  }

  componentWillReceiveProps(props) {
    const { user, users } = props
    this.ensureDefaultUser()
    this.checkUser(users, user)
  }

  ensureDefaultUser() {
    const defaultUser = this.props.defaultUser
    if (this.user != defaultUser) {
      this.user = defaultUser
      this.props.changeUser(defaultUser)
    }
  }

  checkUser(users, user) {
    if (user != null && users.findIndex(({ id }) => id == user) == -1) {
      this.props.changeUser(null)
    }
  }

  render() {
    const { user, users, floatingLabelText } = this.props
    const items = users.map(({ uid, name, id }) => <MenuItem
      key={id}
      value={id}
      secondaryText={uid}
      primaryText={name}
    />)
    const nullItem = []
    if (!floatingLabelText) {
      nullItem.push(<MenuItem
        key="select a user"
        value={null}
        primaryText="Select A User"
      />)
    }

    if (Object.keys(users).length > 0) {
      return (
        <SelectField
          value={user}
          onChange={this.handleChange}
          floatingLabelText={floatingLabelText}
        >
          {nullItem.concat(items)}
        </SelectField>
      )
    } else {
      return (
        <span>There is no permitted users.</span>
      )
    }
  }
}

export default connect(mapStateToProps)(UserSelector)

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Divider from 'material-ui/Divider'

import { SignedIn } from 'components/util'
import User from 'components/User'
import UserForm from 'components/UserForm'

import { requestNewMemberSuggestions } from 'actions/userForm'
import { addMember } from 'actions/groupPage'

const mapStateToProps = ({ groupPage }, { params }) => {
  return {
    members: groupPage.groupMembers,
    id: parseInt(params.id, 10),
  }
}

const actionCreators = {
  addMember, requestNewMemberSuggestions,
}

class GroupMembers extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.requestUserSuggestions = this.requestUserSuggestions.bind(this)
    this.uniqueKey = `group@@${props.id}`
  }

  requestUserSuggestions(value) {
    const { requestNewMemberSuggestions, id } = this.props
    requestNewMemberSuggestions(this.uniqueKey, value, id)
  }

  submit({ user }) {
    const { addMember, id } = this.props
    addMember(id, user)
  }

  render() {
    const { members, theme, id } = this.props
    return (
      <div>
        <Divider style={{ margin: '0.15em 0' }} />
        <SignedIn><UserForm
          groupID={id}
          onChange={this.requestUserSuggestions}
          uniqueKey={this.uniqueKey}
          members={members}
          title="Add New Members"
          submit={this.submit}
          expandable
          expand={false}
          zDepth={2}
        /></SignedIn>
        <Divider style={{ margin: '1em 0' }} />
        {
          members.map(id => (
            <User
              key={id}
              id={id}
            />
          ))
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(GroupMembers)

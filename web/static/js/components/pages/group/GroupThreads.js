import React, { Component } from 'react'
import { connect } from 'react-redux'

import ResourceList from 'components/ResourceList'

import { openGroupThreadsTab } from 'actions/groupPage'
import { submitThread } from 'actions/resources'

const mapStateToProps = ({ groupPage }, { params }) => {
  return {
    threads: groupPage.groupThreads,
    members: groupPage.groupMembers,
    id: parseInt(params.id, 10),
  }
}

const actionCreators = {
  openGroupThreadsTab, submitThread,
}

class GroupThreads extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.id != newProps.id) {
      this.props.openGroupThreadsTab(newProps.id)
    }
  }

  componentDidMount() {
    const { openGroupThreadsTab, id } = this.props
    openGroupThreadsTab(id)
  }

  submit(params) {
    const { id, submitThread } = this.props
    submitThread(Object.assign(params, { group: id }))
  }

  render() {
    const { id, members, threads } = this.props
    const formParams = {
      group: id,
      members,
      submit: this.submit,
    }
    return <ResourceList threads={threads} mode="thread" formParams={formParams} />
  }
}

export default connect(mapStateToProps, actionCreators)(GroupThreads)

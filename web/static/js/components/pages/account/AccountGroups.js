import React, { Component } from 'react'
import { connect } from 'react-redux'

import ResourceList from 'components/ResourceList'

import { openAccountGroupsPage } from 'actions/accountPage'

const mapStateToProps = ({ accountPage }) => {
  return {
    groups: accountPage.groups,
  }
}

const actionCreators = {
  openAccountGroupsPage,
}

class AccountGroups extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { openAccountGroupsPage } = this.props
    openAccountGroupsPage()
  }

  render() {
    const { groups } = this.props
    return <ResourceList groups={groups} mode="group" />
  }
}

export default connect(mapStateToProps, actionCreators)(AccountGroups)

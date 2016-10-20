import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import ResourceList from 'components/ResourceList'

import { openAllThreadsPage } from 'actions/threadPage'

const mapStateToProps = ({ threadPage }) => {
  return {
    threads: threadPage.threads,
  }
}

const actionCreators = {
  openAllThreadsPage,
}

class ThreadAll extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { openAllThreadsPage } = this.props
    openAllThreadsPage()
  }

  render() {
    const { threads } = this.props
    return <ResourceList threads={threads} mode="thread" />
  }
}

export default connect(mapStateToProps, actionCreators)(ThreadAll)

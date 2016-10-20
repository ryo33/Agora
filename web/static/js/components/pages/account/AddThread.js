import React, { Component } from 'react'
import { connect } from 'react-redux'

import ThreadForm from 'components/ThreadForm'

import { submitThread } from 'actions/resources'

const mapStateToProps = () => ({})

const actionCreators = {
  submitThread,
}

class AddThread extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit({ user, title }) {
    const { submitThread } = this.props
    submitThread({ user, title })
  }

  render() {
    return (<ThreadForm
      submit={this.submit}
      zDepth={1}
    />)
  }
}

export default connect(mapStateToProps, actionCreators)(AddThread)

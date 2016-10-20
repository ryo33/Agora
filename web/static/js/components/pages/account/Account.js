import React, { Component } from 'react'
import { connect } from 'react-redux'

class Account extends Component {
  render() {
    return this.props.children
  }
}

export default connect()(Account)

import React, { Component } from 'react'
import { connect } from 'react-redux'

import WatchlistForm from 'components/WatchlistForm'

import { submitWatchlist } from 'actions/resources'

const mapStateToProps = () => ({})

const actionCreators = {
  submitWatchlist,
}

class AddWatchlist extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit({ user, name }) {
    const { submitWatchlist } = this.props
    submitWatchlist({ user, name })
  }

  render() {
    return (<WatchlistForm
      submit={this.submit}
      zDepth={1}
    />)
  }
}

export default connect(mapStateToProps, actionCreators)(AddWatchlist)

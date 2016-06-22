import React, { Component } from 'react'
import { connect } from 'react-redux'

class GroupPage extends Component {
    render() {
        return this.props.children;
    }
}

export default connect()(GroupPage)

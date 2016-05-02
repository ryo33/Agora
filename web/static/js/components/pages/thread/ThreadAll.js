import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import ThreadList from 'components/ThreadList'

class AccountThreads extends Component {
    constructor(props) {
        super(props)
        this.state = {
            threads: []
        }
        window.commonChannel
        .push("thread", {
            action: 'get',
            params: null
        })
        .receive("ok", ({ threads }) => this.setState({ threads }))
    }

    transitionTo(path) {
        return () => {
            this.props.dispatch(push(path));
        }
    }

    render() {
        return <div>
            <ThreadList threads={this.state.threads} />
        </div>
    }
}

export default connect()(AccountThreads)

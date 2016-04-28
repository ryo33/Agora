import React, { Component } from 'react'
import { connect } from 'react-redux'

class Account extends Component {
    componentDidMount() {
        if (!window.accountChannel) {
            window.accountChannel = window.socket.channel("account:" + window.accountID, {})
            window.accountChannel.on("dispatch", ({ actions }) => {
                console.log(actions)
                actions.map(action => { this.props.dispatch(action) })
            })
            window.accountChannel.join()
            .receive("ok", ({ actions }) => { 
                console.log(actions)
                actions.map(action => { this.props.dispatch(action) })
            })
            .receive("error", resp => { console.log("Unable to join", resp) })
        }
    }
    render() {
        return this.props.children;
    }
}

export default connect()(Account)

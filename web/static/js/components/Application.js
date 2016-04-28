import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import LeftNav from './LeftNav'

class Application extends Component {
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

    constructor(props) {
        super(props);
        this.state = {leftNav: false};
    }

    toggleLeftNav() {
        this.setState({leftNav: !this.state.leftNav})
    }

    render() {
        return <div>
            <NavBar
                toggleLeftNav={this.toggleLeftNav.bind(this)}
            />
            <LeftNav 
                history={this.props.history}
                toggleLeftNav={this.toggleLeftNav.bind(this)} open={this.state.leftNav}
            />
            {this.props.children}
        </div>
    }
}

export default connect()(Application)

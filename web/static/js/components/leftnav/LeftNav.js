import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon'
import Divider from 'material-ui/Divider'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { SignedIn, NotSignedIn } from './../util'
import Users from './Users'
import Groups from './Groups'
import Threads from './Threads'

class LeftNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }
    }
    transitionTo(path) {
        return (event) => {
            this.props.toggleLeftNav()
            this.props.dispatch(push(path));
        }
    }
    handleOpen() {
        this.setState(Object.assign({}, this.state, {open: true}))
    }
    handleSignout() {
        window.location.href = "/auth/logout"
    }
    handleCancel() {
        this.setState(Object.assign({}, this.state, {open: false}))
    }
    render() {
        const actions = [
            <FlatButton
                label="Sign out"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSignout.bind(this)}
            />,
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleCancel.bind(this)}
            />
        ]

        return <Drawer
            open={this.props.open}
            docked={false}
            onRequestChange={this.props.setLeftNav}
        >
            <Groups click={this.transitionTo.bind(this)} />
            <Threads click={this.transitionTo.bind(this)} />
            <SignedIn children={<Users transitionTo={this.transitionTo.bind(this)} />} />
            <SignedIn>
                <Divider />
                <MenuItem
                    children="Sign out"
                    onClick={this.handleOpen.bind(this)}
                />
            </SignedIn>
            <Dialog
                title="Sign out"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleCancel}
                >
            Are you sure you want to sign out?
            </Dialog>
        </Drawer>
    }
}

LeftNav.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect()(LeftNav)

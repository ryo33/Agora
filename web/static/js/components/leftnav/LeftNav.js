import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon'
import Divider from 'material-ui/Divider'

import { SignedIn, NotSignedIn } from './../util'
import Users from './Users'
import Groups from './Groups'
import Threads from './Threads'

class LeftNav extends Component {
    constructor(props) {
        super(props)
    }
    transitionTo(path) {
        return (event) => {
            this.props.toggleLeftNav()
            this.props.dispatch(push(path));
        }
    }
    render() {
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
                    linkButton={true}
                    href="/auth/logout"
                />
            </SignedIn>
        </Drawer>
    }
}

LeftNav.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect()(LeftNav)

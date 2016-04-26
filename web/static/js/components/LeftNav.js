import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import LeftNav_ from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import FontIcon from 'material-ui/lib/font-icon'
import ArrowDropRight from 'material-ui/lib/svg-icons/navigation-arrow-drop-right'

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
        return <div>
            <LeftNav_ open={this.props.open} docked={true}>
                <MenuItem
                    children="Close"
                    leftIcon={
                        <FontIcon
                            children="arrow_back"
                            className="material-icons"
                        />
                    }
                    onClick={this.props.toggleLeftNav}
                />
                <MenuItem
                    children="Groups"
                    menuItems={[
                        <MenuItem
                            children="Create New Group"
                            leftIcon={
                                <FontIcon
                                    children="add_box"
                                    className="material-icons"
                                />
                            }
                            onClick={this.transitionTo('/groups/new')}
                        />,
                    ]}
                    rightIcon={<ArrowDropRight />}
                    leftIcon={
                        <FontIcon
                            children="group"
                            className="material-icons"
                        />
                    }
                />
                <MenuItem
                    children="Threads"
                    menuItems={[
                        <MenuItem
                            children="Create New Thread"
                            leftIcon={
                                <FontIcon
                                    children="add_box"
                                    className="material-icons"
                                />
                            }
                            onClick={this.transitionTo('/threads/new')}
                        />
                    ]}
                    rightIcon={<ArrowDropRight />}
                    leftIcon={
                        <FontIcon
                            children="forum"
                            className="material-icons"
                        />
                    }
                />
            </LeftNav_>
        </div>
    }
}

LeftNav.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect()(LeftNav)

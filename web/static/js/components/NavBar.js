import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import IconMenu from 'material-ui/lib/menus/icon-menu'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/lib/menus/menu-item'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import FlatButton from 'material-ui/lib/flat-button'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator'
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title'

import { SignedIn, NotSignedIn } from './util'

const mapStateToProps = (state) => {
    return { router: state.history }
}
class NavBar extends Component {
    transitionTo(path) {
        return (event) => {
            this.props.dispatch(push(path));
        }
    }
    render() {
        return <Toolbar zDepth={3}>
            <ToolbarGroup firstChild={true} float="left">
                <IconButton
                    iconClassName="material-icons"
                    touch={true}
                    children="menu"
                    tooltip="Menu"
                    tooltipPosition="bottom-right"
                    onClick={this.props.toggleLeftNav}
                />
                <IconButton
                    iconClassName="material-icons"
                    touch={true}
                    children="home"
                    tooltip="Home"
                    tooltipPosition="bottom-center"
                    onClick={this.transitionTo('/')}
                />
                <SignedIn><IconButton
                    iconClassName="material-icons"
                    touch={true}
                    children="notifications"
                    tooltip="Notifications"
                    tooltipPosition="bottom-center"
                    onClick={this.transitionTo('/account/notifications')}
                /></SignedIn>
            </ToolbarGroup>
            <ToolbarGroup float="right">
                <NotSignedIn>
                    <FlatButton
                        label="Sign in"
                        style={{marginTop: (48/*muiTheme.button.iconButtonSize*/ - 36/*flatButtonSize*/) / 2 + 1}}
                        primary={true}
                        onClick={this.transitionTo('/signin')}
                    />
                </NotSignedIn>
            </ToolbarGroup>
        </Toolbar>
    }
}

export default connect(mapStateToProps)(NavBar)

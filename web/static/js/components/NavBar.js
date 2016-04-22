import React, { Component } from 'react'
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

/*
import SvgIcon from 'material-ui/lib/svg-icon'
import google from './../../svg/google.svg'
   icon={<SvgIcon dangerouslySetInnerHTML={{ __html: google }} />}
*/

class NavBar extends Component {
    transitionTo(path) {
        return (event) => {
            this.context.router.push(path)
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
                    children="group"
                    tooltip="Group"
                    tooltipPosition="bottom-center"
                    onClick={this.transitionTo('/account/groups')}
                />
                <IconButton
                    iconClassName="material-icons"
                    touch={true}
                    children="forum"
                    tooltip="Threads"
                    tooltipPosition="bottom-center"
                    onClick={this.transitionTo('/account/threads')}
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
                        linkButton={true}
                        href="/auth/google"
                    />
                </NotSignedIn>
            </ToolbarGroup>
        </Toolbar>
    }
}

NavBar.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default NavBar

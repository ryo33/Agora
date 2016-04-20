import React, { Component } from 'react'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/lib/menus/menu-item'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import RaisedButton from 'material-ui/lib/raised-button'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator'
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title'

import SvgIcon from 'material-ui/lib/svg-icon'
import google from './../../svg/google.svg'
import { SignedIn, NotSignedIn } from './util'

/*
   <DropDownMenu value={1}>
   <MenuItem value={1} primaryText="Search" />
   <MenuItem value={2} primaryText="Groups" />
   <MenuItem value={3} primaryText="Threads" />
   <MenuItem value={4} primaryText="Posts" />
   <MenuItem value={5} primaryText="Users" />
   <MenuItem value={6} primaryText="Settings" />
   </DropDownMenu>
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
                    <RaisedButton
                        label="Sign in with Google"
                        labelStyle={{textTransform: "none"}}
                        style={{marginTop: (48/*muiTheme.button.iconButtonSize*/ - 36/*flatButtonSize*/) / 2 + 1}}
                        linkButton={true}
                        href="/auth/google"
                        icon={<SvgIcon dangerouslySetInnerHTML={{ __html: google }} />}
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

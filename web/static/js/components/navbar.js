import React, { Component } from 'react'
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import FlatButton from 'material-ui/lib/flat-button';

import SvgIcon from 'material-ui/lib/svg-icon';
import google from './../../svg/google.svg';
import { SignedIn, NotSignedIn } from './util'

/*

*/

export default class NavBar extends Component {
    render() {
        return <Toolbar>
            <ToolbarGroup firstChild={true} float="left">
                <DropDownMenu value={1}>
                    <MenuItem value={1} primaryText="All Broadcasts" />
                    <MenuItem value={2} primaryText="All Voice" />
                    <MenuItem value={3} primaryText="All Text" />
                    <MenuItem value={4} primaryText="Complete Voice" />
                    <MenuItem value={5} primaryText="Complete Text" />
                    <MenuItem value={6} primaryText="Active Voice" />
                    <MenuItem value={7} primaryText="Active Text" />
                </DropDownMenu>
                <IconButton
                    iconClassName="material-icons"
                    touch={true}
                    children="group"
                    tooltip="Group"
                    tooltipPosition="bottom-center"
                />
                <IconButton
                    iconClassName="material-icons"
                    touch={true}
                    children="forum"
                    tooltip="Threads"
                    tooltipPosition="bottom-center"
                />
                <SignedIn><IconButton
                    iconClassName="material-icons"
                    touch={true}
                    children="notifications"
                    tooltip="Notifications"
                    tooltipPosition="bottom-center"
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

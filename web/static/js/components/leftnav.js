import React, { Component } from 'react'
import LeftNav_ from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class LeftNav extends Component {
    render() {
        return <div>
            <LeftNav_ open={this.props.open} docked={false}>
                <MenuItem onClick={this.props.toggleLeftNav}>Menu Item</MenuItem>
                <MenuItem onClick={this.props.toggleLeftNav}>Menu Item 2</MenuItem>
            </LeftNav_>
        </div>
    }
}

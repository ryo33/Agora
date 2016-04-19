import React, { Component } from 'react'
import NavBar from './navbar'
import LeftNav from './leftnav'
import FlatButton from 'material-ui/lib/flat-button';

export default class Application extends Component {
    constructor(props) {
        super(props);
        this.state = {leftNav: false};
    }

    toggleLeftNav() {
        this.setState({leftNav: !this.state.leftNav})
    }

    render() {
        return <div>
            <NavBar toggleLeftNav={this.toggleLeftNav.bind(this)} />
            <FlatButton
                label="Toggle LeftNav"
                onClick={this.toggleLeftNav.bind(this)}
            />
            <LeftNav toggleLeftNav={this.toggleLeftNav.bind(this)} open={this.state.leftNav} />
            {this.props.children}
        </div>
    }
}

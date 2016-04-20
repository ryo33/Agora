import React, { Component } from 'react'
import NavBar from './Navbar'
import LeftNav from './LeftNav'

class Application extends Component {
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
                history={this.props.history}
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

Application.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Application

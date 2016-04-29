import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import LeftNav from './LeftNav'

class Application extends Component {
    componentWillMount() {
    }

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

export default connect()(Application)

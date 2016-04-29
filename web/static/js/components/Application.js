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
    setLeftNav(leftNav) {
        this.setState({leftNav: leftNav})
    }

    render() {
        return <div>
            <NavBar
                toggleLeftNav={this.toggleLeftNav.bind(this)}
            />
            <LeftNav
                open={this.state.leftNav}
                toggleLeftNav={this.toggleLeftNav.bind(this)}
                setLeftNav={this.setLeftNav.bind(this)}
            />
            {this.props.children}
        </div>
    }
}

export default connect()(Application)

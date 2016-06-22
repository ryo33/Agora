import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import LeftNav from './leftnav/index';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let muiTheme = getMuiTheme();

class Application extends Component {
  componentWillMount() {
  }

  constructor(props) {
    super(props);
    this.state = { leftNav: false };
  }

  toggleLeftNav() {
    this.setState({ leftNav: !this.state.leftNav });
  }
  setLeftNav(leftNav) {
    this.setState({ leftNav: leftNav });
  }

  render() {
    return (<MuiThemeProvider muiTheme={muiTheme}>
            <div>
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
        </MuiThemeProvider>);
  }
}

export default connect()(Application);

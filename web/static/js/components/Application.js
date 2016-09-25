import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Snackbar from 'material-ui/Snackbar';

import NavBar from './NavBar';
import LeftNav from './leftnav/index';
import { closeInfo } from 'actions/global';

let muiTheme = getMuiTheme();

const mapStateToProps = ({ globalInfo }) => {
  return { globalInfo };
}

const actionCreators = {
  closeInfo
};

class Application extends Component {
  constructor(props) {
    super(props);

    this.state = { leftNav: false };
    this.toggleLeftNav = this.toggleLeftNav.bind(this);
    this.setLeftNav = this.setLeftNav.bind(this);
    this.handleInfoClose = this.handleInfoClose.bind(this);
  }

  toggleLeftNav() {
    this.setState({ leftNav: !this.state.leftNav });
  }
  setLeftNav(leftNav) {
    this.setState({ leftNav: leftNav });
  }

  handleInfoClose() {
    this.props.closeInfo();
  }

  render() {
    const { globalInfo } = this.props;
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <div id='header-fixed'>
            <NavBar
              toggleLeftNav={this.toggleLeftNav}
            />
          </div>
          <div id='body'>
            <LeftNav
              open={this.state.leftNav}
              toggleLeftNav={this.toggleLeftNav}
              setLeftNav={this.setLeftNav}
            />
            {this.props.children}
          </div>
          <Snackbar
            open={globalInfo != null}
            message={globalInfo || ''}
            autoHideDuration={2000}
            onRequestClose={this.handleInfoClose}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Application);

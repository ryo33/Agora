import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { grey50 } from 'material-ui/styles/colors';
import { grey200 } from 'material-ui/styles/colors';
import { grey900 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar'

import { SignedIn, NotSignedIn } from './util';

class NavBar extends Component {
  transitionTo(path) {
    return (event) => {
      this.props.dispatch(push(path));
    };
  }
  render() {
    return (
      <AppBar
        title={<span style={{cursor: 'pointer'}}>Agora</span>}
        onTitleTouchTap={this.transitionTo('/')}
        iconElementLeft={
          <IconButton
            iconClassName="material-icons"
            touch
            iconStyle={{color: grey50}}
            children="menu"
            onClick={this.props.toggleLeftNav}
          />
        }
        iconElementRight={
          !window.signedIn
            ? <FlatButton
              backgroundColor={grey50}
              hoverColor={grey200}
              labelStyle={{color: grey900}}
              label="Sign in"
              onClick={this.transitionTo('/signin')}
            />
            : null
        }
      />
    )
  }
}

export default connect()(NavBar);

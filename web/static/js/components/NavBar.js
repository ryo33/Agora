import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
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
        title="Agora"
        iconElementLeft={
          <span>
            <IconButton
              iconClassName="material-icons"
              touch
              children="menu"
              onClick={this.props.toggleLeftNav}
            />
            <IconButton
              iconClassName="material-icons"
              touch
              children="home"
              onClick={this.transitionTo('/')}
            />
          </span>
        }
        iconElementRight={
          <span>
            <SignedIn><IconButton
              iconClassName="material-icons"
              touch
              children="notifications"
              onClick={this.transitionTo('/account/notifications')}
            /></SignedIn>
            {!window.signedIn
                ? <RaisedButton
                  label="Sign in"
                  onClick={this.transitionTo('/signin')}
                />
                : null
            }
          </span>
        }
      />
    )
  }
}

export default connect()(NavBar);

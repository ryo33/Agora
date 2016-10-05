import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';

import { SignedIn, NotSignedIn } from './../util';
import Users from './Users';
import Groups from './Groups';
import Threads from './Threads';
import Watchlists from './Watchlists';
import SignoutDialog from './SignoutDialog';
import { signedIn } from 'global';

class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignoutDialogOpen: false,
    };
    this.transitionTo = this.transitionTo.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  transitionTo(path, onlySignedIn) {
    return (event) => {
      this.props.toggleLeftNav();
      if (onlySignedIn && !signedIn) {
        this.props.dispatch(push('signin'));
      } else {
        this.props.dispatch(push(path));
      }
    };
  }
  handleOpen() {
    this.setState(Object.assign({}, this.state, { isSignoutDialogOpen: true }));
  }
  handleCancel() {
    this.setState(Object.assign({}, this.state, { isSignoutDialogOpen: false }));
  }
  render() {
    return (<Drawer
      open={this.props.open}
      docked={false}
      onRequestChange={this.props.setLeftNav}
    >
      <Groups click={this.transitionTo} />
      <Threads click={this.transitionTo} />
      <Watchlists click={this.transitionTo} />
      <Users transitionTo={this.transitionTo} />
      <SignedIn>
        <Divider />
        <MenuItem
          children="Sign out"
          onClick={this.handleOpen}
        />
      </SignedIn>
      <SignoutDialog
        isSignoutDialogOpen={this.state.isSignoutDialogOpen}
        handleSignoutCancel={this.handleCancel}
      />
    </Drawer>);
  }
}

LeftNav.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect()(LeftNav);

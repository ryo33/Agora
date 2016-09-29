import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { grey50, grey200, grey900 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar'

import { signedIn } from 'global';

const mapStateToProps = ({ routing }) => {
  const path = routing.locationBeforeTransitions.pathname.split('/');
        path.shift()
  return {
    path
  }
}

class NavBar extends Component {
  transitionTo(path) {
    return (event) => {
      this.props.dispatch(push(path));
    };
  }

  getTitle(path) {
    let title = " | "
    switch(path[0]) {
      case 'groups':     title += "Groups"; break;
      case 'threads':    title += "Threads"; break;
      case 'watchlists': title += "Watchlist"; break;
      case 'account':    switch(path[1]) {
        case 'groups':     title += "Your Groups"; break;
        case 'threads':    title += "Your Threads"; break;
        case 'watchlists': title += "Watchlists"; break;
        case 'users':      title += "Users"; break;
        default:           title += "Add"; break;
      } break;
      default: title = ""; break;
    }
    return (
      <span>
        <span style={{cursor: 'pointer'}} onClick={this.transitionTo('/')}>Agora</span>
        {title}
      </span>
    );
  }

  render() {
    const { path } = this.props;
    const title = this.getTitle(path)
    return (
      <AppBar
        title={title}
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
          !signedIn
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

export default connect(mapStateToProps)(NavBar);

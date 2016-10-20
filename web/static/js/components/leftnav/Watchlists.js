import React, { Component } from 'react';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import WatchlistTitle from 'components/WatchlistTitle';
import { AddBoxIcon, WatchlistIcon } from 'components/icons/index';
import { signedIn } from 'global';

let menuItems = [
  {
    signedIn: true,
    children: 'All Your Watchlists',
    leftIcon: <WatchlistIcon />,
    path: '/account/watchlists',
  },
  {
    signedIn: true,
    children: 'Create a New Watchlist',
    leftIcon: <AddBoxIcon />,
    path: '/account/add-watchlist',
  },
];

const mapStateToProps = ({ watchlistHistory }) => {
  return {
    watchlistHistory,
  };
};

const Watchlists = (props) => {
  const { watchlistHistory, click } = props;
  const history = watchlistHistory.map((id) => <MenuItem
    children={<WatchlistTitle id={id} />}
    onClick={click('/watchlists/' + id)}
  />)
  if (watchlistHistory.length != 0) {
    history.unshift(<Divider />);
  }
  return (
    <MenuItem
      children="Watchlists"
      disabled={!signedIn}
      menuItems={
        menuItems.map(({ children, leftIcon, path, signedIn: only }) =>
            <MenuItem
              children={children}
              leftIcon={leftIcon}
              onClick={props.click(path, only)}
              disabled={only && !signedIn}
            />
        ).filter(mi => mi != null).concat(history)
      }
      rightIcon={<ArrowDropRight />}
      leftIcon={<WatchlistIcon />}
    />
  )
};

export default connect(mapStateToProps)(Watchlists);

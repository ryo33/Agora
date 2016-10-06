import React, { Component } from 'react';
import { connect } from 'react-redux';

import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

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


const Watchlists = (props) => <MenuItem
  children="Watchlists"
  disabled={!signedIn}
  menuItems={menuItems.map(({ children, leftIcon, path, signedIn: only }) =>
      <MenuItem
        children={children}
        leftIcon={leftIcon}
        onClick={props.click(path, only)}
        disabled={only && !signedIn}
      />
  ).filter(mi => mi != null)}
  rightIcon={<ArrowDropRight />}
  leftIcon={<WatchlistIcon />}
/>;

export default Watchlists;

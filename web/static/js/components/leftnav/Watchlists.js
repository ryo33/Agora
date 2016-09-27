import React, { Component } from 'react';
import { connect } from 'react-redux';

import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import { AddBoxIcon, WatchlistIcon } from 'components/icons/index';
import { SignedIn } from 'components/util';

let menuItems = [
  {
    signedIn: true,
    children: 'All Your Watchlists',
    leftIcon: <WatchlistIcon />,
    path: '/account/watchlists',
  },
  {
    signedIn: true,
    children: 'Create New Watchlist',
    leftIcon: <AddBoxIcon />,
    path: '/account/add-watchlist',
  },
];


const Watchlists = (props) => <MenuItem
  children="Watchlists"
  menuItems={menuItems.map(({ children, leftIcon, path, signedIn }) =>
        !signedIn || window.signedIn
        ? <MenuItem
          children={children}
          leftIcon={leftIcon}
          onClick={props.click(path)}
        />
        : null).filter(mi => mi != null)}
  rightIcon={<ArrowDropRight />}
  leftIcon={<WatchlistIcon />}
/>;

export default Watchlists;

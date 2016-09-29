import React, { Component } from 'react';
import { connect } from 'react-redux';

import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import { AddBoxIcon, WatchlistIcon } from 'components/icons/index';
import { onlySignedIn } from 'hocs/global';

let menuItems = [
  {
    children: 'All Your Watchlists',
    leftIcon: <WatchlistIcon />,
    path: '/account/watchlists',
  },
  {
    children: 'Create New Watchlist',
    leftIcon: <AddBoxIcon />,
    path: '/account/add-watchlist',
  },
];


const Watchlists = (props) => <MenuItem
  children="Watchlists"
  menuItems={menuItems.map(({ children, leftIcon, path, signedIn }) =>
      <MenuItem
        children={children}
        leftIcon={leftIcon}
        onClick={props.click(path)}
      />
  ).filter(mi => mi != null)}
  rightIcon={<ArrowDropRight />}
  leftIcon={<WatchlistIcon />}
/>;

export default onlySignedIn(Watchlists);

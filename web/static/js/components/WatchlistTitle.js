import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requireWatchlist } from 'hocs/resources';

const WatchlistTitle = ({ watchlist }) => <span>{watchlist.name}</span>;

export default requireWatchlist()(WatchlistTitle);

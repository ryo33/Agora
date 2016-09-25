import React, { Component } from 'react'
import { connect } from 'react-redux'

import Watchlist from 'components/Watchlist'
import ResourceList from 'components/ResourceList';

import { openAccountWatchlistsPage } from 'actions/accountPage';
import { getAccountWatchlists } from 'selectors/accountPage';

const mapStateToProps = (state) => {
  return {
    watchlists: getAccountWatchlists(state)
  };
};

const actionCreators = {
  openAccountWatchlistsPage
};

class AccountWatchlists extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { openAccountWatchlistsPage } = this.props;
    openAccountWatchlistsPage();
  }

  render() {
    const { watchlists } = this.props;
    return (
      <div>
        <ResourceList watchlists={watchlists} />
      </div>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(AccountWatchlists)

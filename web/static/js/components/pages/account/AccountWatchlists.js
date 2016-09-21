import React, { Component } from 'react'
import { connect } from 'react-redux'

import Watchlist from 'components/Watchlist'

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
        {
          watchlists.map(id => (
            <Watchlist
              key={id}
              id={id}
            />
          ))
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(AccountWatchlists)

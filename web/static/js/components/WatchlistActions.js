import React, { Component } from 'react';
import { connect } from 'react-redux';

import WatchAction from 'components/resourceActions/WatchAction';
import CopyAction from 'components/resourceActions/CopyAction';

class WatchlistActions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, watchWatchlist } = this.props;
    return (
      <div>
        <CopyAction
          link={`watchlists/${id}`}
        />
      </div>
    );
  }
}

export default WatchlistActions;

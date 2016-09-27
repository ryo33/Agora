import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';

import { WatchlistIcon } from 'components/icons/index';
import WatchForm from 'components/WatchForm';

class WatchAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWatchOpened: false
    };
    this.switchWatch = this.switchWatch.bind(this);
    this.selectWatchlist = this.selectWatchlist.bind(this);
    this.isWatched = this.isWatched.bind(this);
  }

  selectWatchlist(watchlist) {
    const { id, watch } = this.props;
    this.setState({
      isWatchOpened: false
    });
    watch(watchlist, id);
  }

  switchWatch() {
    this.setState({
      isWatchOpened: ! this.state.isWatchOpened
    });
  }

  isWatched(watchlist) {
    const { id, itemsKey } = this.props;
    return watchlist[itemsKey].includes(id);
  }

  render() {
    const { isWatchOpened } = this.state;
    return (
      <span>
        {
          isWatchOpened
          ? <WatchForm
            select={this.selectWatchlist}
            isWatched={this.isWatched}
          />
          : <FlatButton
            icon={<WatchlistIcon />}
            label="Watch"
            onClick={this.switchWatch}
          />
        }
      </span>
    )
  }
}

export default WatchAction;

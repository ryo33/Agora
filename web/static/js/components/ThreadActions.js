import React, { Component } from 'react';
import { connect } from 'react-redux';

import WatchAction from 'components/resourceActions/WatchAction';

import { watchThread } from 'actions/resources';

const actionCreators = {
  watchThread
};

class ThreadActions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, watchThread } = this.props;
    return (
      <div>
        <WatchAction
          id={id}
          watch={watchThread}
          itemsKey="watch_threads"
        />
      </div>
    );
  }
}

export default connect(null, actionCreators)(ThreadActions);

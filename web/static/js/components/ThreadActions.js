import React, { Component } from 'react';
import { connect } from 'react-redux';

import WatchAction from 'components/resourceActions/WatchAction';
import CopyAction from 'components/resourceActions/CopyAction';
import EditThreadAction from 'components/resourceActions/EditThreadAction';
import LinkAction from 'components/resourceActions/LinkAction';

import { watchThread } from 'actions/resources';

const actionCreators = {
  watchThread
};

class ThreadActions extends Component {
  constructor(props) {
    super(props);
  }

  renderEditAction() {
    const { id, isOwned = false } = this.props;
    if (isOwned) {
      return <EditThreadAction id={id} />;
    } else {
      return null;
    }
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
        <CopyAction
          link={`threads/${id}`}
        />
        {this.renderEditAction()}
        <LinkAction
          label="Webhooks"
          href={`/threads/${id}/webhooks`}
        />
      </div>
    );
  }
}

export default connect(null, actionCreators)(ThreadActions);

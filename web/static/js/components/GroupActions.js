import React, { Component } from 'react';
import { connect } from 'react-redux';

import WatchAction from 'components/resourceActions/WatchAction';
import CopyAction from 'components/resourceActions/CopyAction';
import EditGroupAction from 'components/resourceActions/EditGroupAction';

import { watchGroup } from 'actions/resources';

const actionCreators = {
  watchGroup
};

class GroupActions extends Component {
  constructor(props) {
    super(props);
  }

  renderEditAction() {
    const { id, isOwned = false } = this.props;
    if (isOwned) {
      return <EditGroupAction id={id} />;
    } else {
      return null;
    }
  }

  render() {
    const { id, watchGroup } = this.props;
    return (
      <div>
        <WatchAction
          id={id}
          watch={watchGroup}
          itemsKey="watch_groups"
        />
        <CopyAction
          link={`groups/${id}`}
        />
        {this.renderEditAction()}
      </div>
    );
  }
}

export default connect(null, actionCreators)(GroupActions);

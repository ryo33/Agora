import React, { Component } from 'react';
import { connect } from 'react-redux';

import WatchAction from 'components/resourceActions/WatchAction';

import { watchGroup } from 'actions/resources';

const actionCreators = {
  watchGroup
};

class GroupActions extends Component {
  constructor(props) {
    super(props);
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
      </div>
    );
  }
}

export default connect(null, actionCreators)(GroupActions);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Group from 'components/Group';

import { openGroupGroupsTab } from 'actions/groupPage';

const mapStateToProps = ({ groupPage }, { params }) => {
  return {
    groups: groupPage.groupGroups,
    id: params.id
  };
};

const actionCreators = {
  openGroupGroupsTab
};

class GroupGroups extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { openGroupGroupsTab, id } = this.props;
    openGroupGroupsTab(id);
  }

  render() {
    const { groups, id } = this.props;
    return <div>
      {
        groups.map((id) => (
          <Group
            key={id}
            id={id}
          />
        ))
      }
    </div>
  }
}

export default connect(mapStateToProps, actionCreators)(GroupGroups);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import ResourceList from 'components/ResourceList';

import { openGroupGroupsTab } from 'actions/groupPage';
import { submitGroup } from 'actions/resources';

const mapStateToProps = ({ groupPage }, { params }) => {
  return {
    groups: groupPage.groupGroups,
    members: groupPage.groupMembers,
    id: parseInt(params.id, 10)
  };
};

const actionCreators = {
  openGroupGroupsTab, submitGroup
};

class GroupGroups extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { openGroupGroupsTab, id } = this.props;
    openGroupGroupsTab(id);
  }

  submit(params) {
    const { id, submitGroup } = this.props;
    submitGroup(Object.assign(params, {group: id}));
  }

  render() {
    const { groups, members, id } = this.props;
    const formParams = {
      group: id,
      members: members,
      submit: this.submit,
      zDepth: 2,
      groupID: id,
    }
    return <ResourceList groups={groups} mode='group' formParams={formParams}/>
  }
}

export default connect(mapStateToProps, actionCreators)(GroupGroups);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { SignedIn } from 'components/util';
import Divider from 'material-ui/Divider';
import Group from 'components/Group';
import GroupForm from 'components/GroupForm';

import { openGroupGroupsTab } from 'actions/groupPage';
import { submitGroup } from 'actions/resources';

const mapStateToProps = ({ groupPage }, { params }) => {
  return {
    groups: groupPage.groupGroups,
    id: params.id
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

  submit({ user, name }) {
    const { id, submitGroup } = this.props;
    submitGroup({group: id, user, name});
  }

  render() {
    const { groups, id } = this.props;
    return <div>
      <Divider style={{ margin: '0.15em 0' }} />
      <SignedIn><GroupForm
          title="Add New Groups"
          submit={this.submit}
          expandable={true}
          expand={false}
          zDepth={2}
          groupID={id}
        /></SignedIn>
      <Divider style={{ margin: '1em 0' }} />
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

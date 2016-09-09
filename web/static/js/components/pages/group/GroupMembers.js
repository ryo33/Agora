import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, CardActions, CardHeader,
  CardMedia, CardTitle, CardText
} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import { joinGroupChannel, leaveChannel } from '../../../socket';
import { SignedIn } from 'components/util';
import ResourceTitle from 'components/ResourceTitle';
import Group from 'components/Group';
import User from 'components/User';
import UserForm from 'components/UserForm';

import { openGroupMembersTab, addMember } from 'actions/groupPage'

const mapStateToProps = ({ groupPage }, { params }) => {
  return {
    members: groupPage.groupMembers,
    id: params.id
  };
};

const actionCreators = {
  openGroupMembersTab, addMember
};

class GroupMembers extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { openGroupMembersTab, id } = this.props;
    openGroupMembersTab(id);
  }

  submit({ user }) {
    const { addMember, id } = this.props;
    addMember(id, user)
  }

  render() {
    const { members, theme, id } = this.props;
    return (
      <div>
        <Divider style={{ margin: '0.15em 0' }} />
        <SignedIn><UserForm
            title="Add New Members"
            submit={this.submit}
            expandable
            expand={false}
            zDepth={2}
            groupID={id}
          /></SignedIn>
        <Divider style={{ margin: '1em 0' }} />
        {
          members.map(id => (
            <User
              key={id}
              id={id}
            />
          ))
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(GroupMembers);

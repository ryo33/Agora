import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

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

const mapStateToProps = ({ groups, theme }) => {
  const group = groups.groups[groups.currentGroup];
  const currentGroup = groups.currentGroup;
  let props = group
    ? {
      currentGroup: currentGroup,
      title: group.title,
      insertedAt: group.insertedAt,
      parentGroup: group.parentGroup,
      user: group.user,
      membersMap: group.membersMap,
      membersList: group.membersList,
      isFetchingMembers: groups.isFetchingMembers[currentGroup],
      isFetchingMissingMembers: groups.isFetchingMissingMembers[currentGroup],
    }
      : {};
      return Object.assign(props, { theme });
};

class GroupMembers extends Component {
  constructor(props, context) {
    super(props, context)
    this.groupID = this.props.params.id
  }

  transitionTo(path) {
    return () => {
      this.props.dispatch(push(path));
    };
  }

  submit(member) {
    member = Object.assign({}, member, {
      group_id_to_join: this.groupID,
    });
    window.groupChannel.push('member', {
      action: 'add',
      params: member,
    });
  }

  render() {
    const { membersMap, membersList, currentGroup,
      isFetchingMissingContents,
      isFetchingMembers,
      theme } = this.props;
      if (isFetchingMembers) {
        return <p>Fetching the contents</p>;
      } else if (isFetchingMissingContents) {
        return <p>Fetching the missing contents</p>;
      } else if (membersList) {
        return (<div>
          <Divider style={{ margin: '0.15em 0' }} />
          <SignedIn><UserForm
              title="Add New Members"
              submit={this.submit.bind(this)}
              expandable
              expand={false}
              zDepth={2}
              groupID={this.groupID}
            /></SignedIn>
          <Divider style={{ margin: '1em 0' }} />
          {membersList.map((id) => membersMap.hasOwnProperty(id)
            ? <User
              key={id}
              id={id}
              title={membersMap[id].title}
              user={membersMap[id].user}
              insertedAt={membersMap[id].inserted_at}
            />
            : null)
          }
        </div>);
      } else {
        return null;
      }
  }
}

export default connect(mapStateToProps)(GroupMembers);

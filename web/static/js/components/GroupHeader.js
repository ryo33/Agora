import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import { grey900 } from 'material-ui/styles/colors';
import { Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import Unimplemented from 'components/Unimplemented';
import GroupActions from 'components/GroupActions';
import { GroupIcon, ThreadIcon, UserIcon } from 'components/icons';
import ParentGroup from 'components/ParentGroup';

import { requireGroup } from 'hocs/resources';
import { getAccountUserIDs } from 'selectors/accountPage';

const mapStateToProps = (state, { id }) => {
  const group = state.groups[id];
  const users = getAccountUserIDs(state);
  return {
    group,
    isOwned: group ? users.includes(group.user_id) : false
  }
};

const actionCreators = {
  push
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(actionCreators, dispatch),
    dispatch
  };
};

class GroupHeader extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { id, push } = this.props;
    push('/groups/' + id);
  }

  render() {
    const { id, group, isOwned } = this.props;
    const parentID = group.parent_group_id;
    const title = (
      <span
        onClick={this.handleClick}
      >
        <GroupIcon />
        {`  ${group.name}  `}
        <ThreadIcon />
        {`  ${group.threads}  `}
        <GroupIcon />
        {`  ${group.groups}  `}
        <UserIcon />
        {`  ${group.members}  `}
      </span>
    );
    return (
      <div>
        {
          parentID
          ? <span>
            <ParentGroup id={parentID} />
          </span>
          : null
        }
        <Card
          initiallyExpanded={false}
        >
          <CardTitle
            actAsExpander={true}
            showExpandableButton={true}
            title={title}
            subtitle="Group description"
          />
          <CardActions expandable={true}>
            <GroupActions id={id} isOwned={isOwned} />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(requireGroup(GroupHeader));

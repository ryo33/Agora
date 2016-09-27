import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import { grey900 } from 'material-ui/styles/colors';
import { Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import Unimplemented from 'components/Unimplemented';
import GroupActions from 'components/GroupActions';
import { GroupIcon, ThreadIcon, UserIcon } from 'components/icons';

import { requireGroup } from 'hocs/resources';

const mapStateToProps = ({ theme, groups }, { id }) => {
  return {
    group: groups[id],
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
    const { id, group } = this.props;
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
        <UserIconq />
        {`  ${group.members}  `}
      </span>
    );
    return (
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
          <GroupActions id={id} />
        </CardActions>
    </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(requireGroup(GroupHeader));

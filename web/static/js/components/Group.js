import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import { grey900 } from 'material-ui/styles/colors';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';

import Unimplemented from 'components/Unimplemented';
import GroupActions from 'components/GroupActions';

import { GroupIcon, ThreadIcon, UserIcon } from 'components/icons/index'

import { requireGroup } from 'hocs/resources';

const mapStateToProps = ({ theme, groups }, { id }) => {
  return {
    group: groups[id],
    theme
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

class Group extends Component {
  componentDidMount () {
    this.props.onRender();
  }

  render() {
    const { id, group, push, zDepth, theme } = this.props;
    const title = <div>
      {GroupIcon}
      {`  ${group.name}  `}
    </div>
    return (
      <Card
        onClick={() => push('/groups/' + id)}
        style={theme.group.root}
        zDepth={zDepth}
      >
        <CardTitle title={title} subtitle="Group description" />
        <CardText>
          {GroupIcon}
          {`  ${group.groups}  `}
          {ThreadIcon}
          {`  ${group.threads}  `}
          {UserIcon}
          {`  ${group.members}  `}
        </CardText>
        <CardActions expandable={true}>
          <GroupActions id={id} />
        </CardActions>
    </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(requireGroup(Group));

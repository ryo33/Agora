import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import FontIcon from 'material-ui/FontIcon';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import Unimplemented from 'components/Unimplemented';
import ResourceTitle from 'components/ResourceTitle';
import GroupActions from 'components/GroupActions';

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
  render() {
    const { id, group, push, zDepth, theme } = this.props;
    return (
      <Card
        onClick={() => push('/groups/' + id)}
        style={theme.group.root}
        zDepth={zDepth}
      >
        <CardMedia
          overlay={<CardTitle title={group.name} subtitle="Group description" />}
        >
          <div id='resource-image'>
            <h1>IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE</h1>
          </div>
        </CardMedia>
        <CardText>
          <FontIcon
            children="group"
            className="material-icons"
          />
          {`  ${group.groups}  `}
          <FontIcon
            children="forum"
            className="material-icons"
          />
          {`  ${group.threads}  `}
          <FontIcon
            children="person"
            className="material-icons"
          />
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

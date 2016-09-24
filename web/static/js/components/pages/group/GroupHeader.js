import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FontIcon from 'material-ui/FontIcon';
import { grey900 } from 'material-ui/styles/colors';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import Unimplemented from 'components/Unimplemented';
import GroupActions from 'components/GroupActions';

import { requireGroup } from 'hocs/resources';

const mapStateToProps = ({ theme, groups }, { id }) => {
  return {
    group: groups[id],
  }
};

class GroupHeader extends Component {
  render() {
    const { id, group } = this.props;
    const title = <div>
      {`  ${group.name}  `}
      <span style={{float: "right"}}>
        <FontIcon
          children="group"
          color={grey900}
          className="material-icons"
        />
        {`  ${group.groups}  `}
        <FontIcon
          children="forum"
          color={grey900}
          className="material-icons"
        />
        {`  ${group.threads}  `}
        <FontIcon
          children="person"
          color={grey900}
          className="material-icons"
        />
        {`  ${group.members}  `}
      </span>
    </div>
    return (
      <Card>
        <CardTitle title={title} subtitle="Group description" />
        <CardText>
        </CardText>
    </Card>
    );
  }
}

export default connect(mapStateToProps)(requireGroup(GroupHeader));

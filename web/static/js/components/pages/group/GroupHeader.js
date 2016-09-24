import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FontIcon from 'material-ui/FontIcon';
import { grey100 } from 'material-ui/styles/colors';
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
          color={grey100}
          className="material-icons"
        />
        {`  ${group.groups}  `}
        <FontIcon
          children="forum"
          color={grey100}
          className="material-icons"
        />
        {`  ${group.threads}  `}
        <FontIcon
          children="person"
          color={grey100}
          className="material-icons"
        />
        {`  ${group.members}  `}
      </span>
    </div>
    return (
      <Card>
        <CardMedia
          overlay={<CardTitle title={title} subtitle="Group description" />}
        >
          <div id='group-header-image'>
            <h1>IMAGE IMAGE IMAGE IMAGE IMAGE IMAGE</h1>
          </div>
        </CardMedia>
        <CardText>
        </CardText>
    </Card>
    );
  }
}

export default connect(mapStateToProps)(requireGroup(GroupHeader));

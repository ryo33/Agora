import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import { Card, CardHeader, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import Unimplemented from 'components/Unimplemented';
import ResourceTitle from 'components/ResourceTitle';

import { requireUser } from 'hocs/resources';

const mapStateToProps = ({ users, theme }, { id }) => {
  return {
    user: users[id],
    theme
  }
}

const actionCreators = {
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(actionCreators, dispatch),
    dispatch
  };
};

class User extends Component {
  render() {
    const { id, group_id, user, zDepth, theme, onClick } = this.props;
    return (
      <Card
        style={theme.user.root}
        zDepth={zDepth}
      >
        <CardHeader
          style={theme.user.header}
          title={<ResourceTitle
            user={id}
            onClick={onClick}
            path={'/users/' + user.id}
            insertedAt={user.inserted_at}
          />}
          showExpandableButton={true}
        />
        <Divider />
        <CardActions expandable={true}>
          <Unimplemented />
        </CardActions>
      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(requireUser(User));

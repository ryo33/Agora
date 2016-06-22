import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Card, CardHeader, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import Unimplemented from 'components/Unimplemented';
import ResourceTitle from 'components/ResourceTitle';

const mapStateToProps = ({ theme }) => {
  return {
    theme,
  };
};

const Thread = ({ id, title, user, insertedAt, dispatch, zDepth, theme }) => <Card
  style={theme.thread.root}
  zDepth={zDepth}
>
    <CardHeader
      style={theme.thread.header}
      title={<ResourceTitle
        user={user}
        title=""
        insertedAt={insertedAt}
      />}
      showExpandableButton
    />
    <Divider />
    <CardText
      style={theme.thread.body}
      onClick={() => dispatch(push('/threads/' + id))}
      style={{
        cursor: 'pointer',
      }}
    >
        {title}
    </CardText>
    <CardActions expandable>
        <Unimplemented />
    </CardActions>
</Card>;

export default connect(mapStateToProps)(Thread);

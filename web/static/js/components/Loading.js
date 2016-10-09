import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, CardText } from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';

const mapStateToProps =({ theme }) => ({
  theme
});

const Loading = ({ theme }) => (
  <Card
    style={theme.resource.root}
    containerStyle={{padding: 0}}
  >
    <CardText>
      <LinearProgress mode="indeterminate" />
    </CardText>
  </Card>
)

export default connect(mapStateToProps)(Loading);

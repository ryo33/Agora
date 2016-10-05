import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, CardText } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';

const mapStateToProps =({ theme }) => ({
  theme
});

const Loading = ({ theme }) => (
  <Card
    style={theme.resource.root}
    containerStyle={{padding: 0}}
  >
    <CardText>
      <CircularProgress size={0.5} />
    </CardText>
  </Card>
)

export default connect(mapStateToProps)(Loading);

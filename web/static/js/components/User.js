import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Card, CardHeader, CardActions, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'

import Unimplemented from 'components/Unimplemented'
import ResourceTitle from 'components/ResourceTitle'

const mapStateToProps = ({theme}) => {
  return {
    theme
  }
}

const User = ({
  group_id, user, zDepth, theme,
  dispatch, onClick
}) => <Card
  style={theme.user.root}
  zDepth={zDepth}
>
  <CardHeader
    style={theme.user.header}
    title={<ResourceTitle
      user={user}
      onClick={onClick}
      path={'/users/' + user.id}
      insertedAt={user.insertedAt}
    />}
    showExpandableButton={true}
  />
  <Divider />
  <CardActions expandable={true}>
    <Unimplemented />
  </CardActions>
</Card>

export default connect(mapStateToProps)(User)

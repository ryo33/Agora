import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Card, CardHeader, CardActions, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'

import Unimplemented from 'components/Unimplemented'
import ResourceTitle from 'components/ResourceTitle'

const Thread = ({ id, title, user, dispatch, style, zDepth }) => <Card
    style={style}
    zDepth={zDepth}
>
    <CardHeader
        title={<ResourceTitle
            user={user}
            title=""
        />}
        showExpandableButton={true}
    />
    <Divider />
    <CardText
        onClick={() => dispatch(push('/threads/' + id))}
        style={{
            cursor: 'pointer'
        }}
    >
        {title}
    </CardText>
    <CardActions expandable={true}>
        <Unimplemented />
    </CardActions>
</Card>

export default connect()(Thread)

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

const Post = ({ id, title, text, insertedAt, user,
              dispatch, zDepth, theme }) => <Card
    style={theme.post.root}
    zDepth={zDepth}
>
    <CardHeader
        style={theme.post.header}
        title={<ResourceTitle
            user={user}
            title={title}
            path={'/posts/' + id}
            insertedAt={insertedAt}
        />}
        showExpandableButton={true}
    />
    <Divider />
    <CardText
        style={theme.post.body}
        actAsExpander={true}
    >
        {text}
    </CardText>
    <Divider />
    <CardActions expandable={true}>
        <Unimplemented />
    </CardActions>
</Card>

export default connect(mapStateToProps)(Post)

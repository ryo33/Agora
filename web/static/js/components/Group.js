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

const Group = ({ id, name, user, parentGroup, dispatch, zDepth, theme, insertedAt }) => <Card
    style={theme.group.root}
    zDepth={zDepth}
>
    <CardHeader
        style={theme.group.header}
        title={<ResourceTitle
            insertedAt={insertedAt}
            user={user}
            title=""
        />}
        showExpandableButton={true}
    />
    <Divider />
    <CardText
        style={theme.group.body}
        onClick={() => dispatch(push('/groups/' + id))}
        style={{
            cursor: 'pointer'
        }}
    >
        {name}
    </CardText>
    <CardActions expandable={true}>
        <Unimplemented />
    </CardActions>
</Card>

export default connect(mapStateToProps)(Group)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Card, CardHeader, CardActions, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import Unimplemented from 'components/Unimplemented'

const Post = ({ id, title, text, user, dispatch }) => <Card>
    <CardHeader
        title={<span>
            <span
                style={{cursor: 'pointer'}}
                onClick={() => dispatch(push('/users/' + user.uid))}
            >
                {user.name}
                <small
                    style={{
                        marginLeft: '0.2em',
                        marginRight: '1.2em'
                    }}
                    children={'@' + user.uid}
                />
            </span>
            <span
                style={{cursor: 'pointer'}}
                onClick={() => dispatch(push('/posts/' + id))}
            >
                <strong>{title}</strong>
            </span>
        </span>}
        showExpandableButton={true}
    />
    <CardText actAsExpander={true}>
        {text}
    </CardText>
    <CardActions expandable={true}>
        <Unimplemented />
    </CardActions>
</Card>

export default connect()(Post)

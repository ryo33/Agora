import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Card, CardActions, CardHeader,
    CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'

import { joinGroupChannel, leaveChannel } from '../../../socket'
import GroupForm from './../../GroupForm'

class AddGroup extends Component {
    submit(params) {
        window.accountChannel
        .push("group", {
            action: 'add',
            params: params
        })
        .receive("ok", ({ id }) => { 
            this.props.dispatch(push("/groups/" + id))
        })
    }

    render() {
        return <GroupForm
            submit={this.submit.bind(this)}
        />
    }
}

export default connect()(AddGroup)

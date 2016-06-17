import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Map } from 'immutable'

import TextField from 'material-ui/TextField';
import { Card, CardActions, CardHeader,
    CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import UserSelector from './UserSelector'

const mapStateToProps = ({ account }) => {
    return {
        currentUser: account.currentUser
    }
}

class GroupForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.name || "",
            user: this.props.currentUser
        }
    }

    handleChange(column, event) {
        this.setState(
            Object.assign(
                {}, this.state,
                Map(this.state).set(column, event.target.value).toJS()
            )
        )
    }

    submit() {
        this.props.submit({
            user_id: this.state.user,
            name: this.state.name
        })
        this.setState(Object.assign({}, this.state, {
            name: ''
        }))
    }

    changeUser(user) {
        this.setState(Object.assign({}, this.state, {user: user}))
    }

    render() {
        return <Card>
            <CardTitle title="New Group" />
            <CardText>
                <TextField
                    hintText="Title"
                    floatingLabelText="Title"
                    value={this.state.name}
                    onChange={this.handleChange.bind(this, "name")}
                />
            </CardText>
            <CardActions>
                <RaisedButton
                    label="Submit"
                    primary={true}
                    onClick={this.submit.bind(this)}
                />
                <UserSelector
                    user={this.state.user}
                    changeUser={this.changeUser.bind(this)}
                />
            </CardActions>
        </Card>
    }
}

export default connect(mapStateToProps)(GroupForm)

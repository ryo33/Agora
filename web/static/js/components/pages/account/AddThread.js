import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { Card, CardActions, CardHeader,
    CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import UserSelector from '../../UserSelector'

const mapStateToProps = ({ account }) => {
    console.log(account)
    return {
        users: account.users,
        currentUser: account.currentUser,
        name: account.forms.addThread.name
    }
}

class AddThread extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            user: null
        }
    }

    componentWillMount() {
        this.setState({
            name: this.props.name,
            user: this.props.currentUser
        })
    }

    componentWillReceiveProps(props) {
        this.setState({
            name: props.name,
            user: props.currentUser
        })
    }

    handleUserChange(event, index, value) {
        this.setState(Object.assign({}, this.state, {user: value}))
    }

    handleChange(column, event) {
        let tmp = {}
        tmp[column] = event.target.value
        this.setState(Object.assign({}, this.state, tmp))
    }

    click() {
        window.accountChannel
        .push("thread", {
            action: 'add',
            params: {name: this.state.name, user_id: this.state.user}
        })
        .receive("ok", ({ id }) => { 
            this.props.dispatch(push("/threads/" + id))
        })
    }

    render() {
        return <Card>
            <CardTitle title="Add New Thread" />
            <CardText>
                <UserSelector
                    users={this.props.users}
                    value={this.state.user}
                    handleChange={this.handleUserChange.bind(this)}
                /><br />
                <TextField
                    hintText="Name"
                    floatingLabelText="Name"
                    value={this.state.name}
                    onChange={this.handleChange.bind(this, "name")}
                />
            </CardText>
            <CardActions>
                <RaisedButton
                    label="Submit"
                    onClick={this.click.bind(this)}
                />
            </CardActions>
        </Card>
    }
}

export default connect(mapStateToProps)(AddThread)

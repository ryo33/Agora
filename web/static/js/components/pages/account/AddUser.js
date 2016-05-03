import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { Card, CardActions, CardHeader,
    CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const mapStateToProps = ({ account }) => {
    return {
        id: account.forms.addUser.id,
        name: account.forms.addUser.name,
    }
}

class AddUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            name: "",
            idLen: "",
            nameLen: "",
            idColor: {colors: '#00bcd4', textAlign: 'right'},
            nameColor: {colors: '#00bcd4', textAlign: 'right'}
        }
    }

    componentWillMount() {
        this.setState({
            id: this.props.id,
            name: this.props.name
        })
    }

    componentWillReceiveProps(props) {
        this.setState({
            id: props.id,
            name: props.name
        })
    }

    handleChange(column, event) {
        const minLen = {id: 3, name:1}
        const maxLen = {id:30, name:30}
        let tmp = {}

        tmp[column] = event.target.value
        if (event.target.value != "") {
            let len = event.target.value.length
            tmp[column + "Len"] = len + "/" + maxLen[column]
            tmp[column + "Color"] = (len <= minLen[column] || len > maxLen[column]
                                    ? {color: '#F44336', textAlign: 'right'}
                                    : {color: '#8BC34A', textAlign: 'right'})
        } else {
            tmp[column + "Len"] = ""
            tmp[column + "Color"] = {color: '#00bcd4'}
        }
        this.setState(Object.assign({}, this.state, tmp))
    }

    click() {
        window.accountChannel
        .push("add_user", {uid: this.state.id, name: this.state.name})
        .receive("ok", () => {
            this.props.dispatch(push("/account/users"))
        })
    }

    render() {
        return <Card>
            <CardTitle title="Add New User" />
            <CardText>
                <TextField
                    hintText="ID"
                    floatingLabelText="ID"
                    errorText={this.state.idLen}
                    errorStyle={this.state.idColor}
                    value={this.state.id}
                    onChange={this.handleChange.bind(this, "id")}
                /><br/>
                <TextField
                    hintText="Name"
                    floatingLabelText="Name"
                    errorText={this.state.nameLen}
                    errorStyle={this.state.nameColor}
                    value={this.state.name}
                    onChange={this.handleChange.bind(this, "name")}
                /><br/>
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

export default connect(mapStateToProps)(AddUser)

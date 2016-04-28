import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import CardText from 'material-ui/lib/card/card-text';

class AddUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            name: ""
        }
    }

    handleChange(column) {
        return (e) => {
            let tmp = {}
            tmp[column] = e.target.value
            this.setState(Object.assign({}, this.state, tmp))
        }
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
                    value={this.state.id}
                    onChange={this.handleChange("id")}
                /><br/>
                <TextField
                    hintText="Name"
                    floatingLabelText="Name"
                    value={this.state.name}
                    onChange={this.handleChange("name")}
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

export default connect()(AddUser)

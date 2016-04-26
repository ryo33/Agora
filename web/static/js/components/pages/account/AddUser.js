import React, { Component } from 'react'
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
    render() {
        return <Card>
            <CardTitle title="Add New User" />
            <CardText>
                <TextField
                    hintText="ID"
                    floatingLabelText="ID"
                /><br/>
                <TextField
                    hintText="Name"
                    floatingLabelText="Name"
                /><br/>
            </CardText>
            <CardActions>
                <RaisedButton
                    label="Submit"
                />
            </CardActions>
        </Card>
    }
}

export default AddUser

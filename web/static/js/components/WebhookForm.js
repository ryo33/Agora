import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import TextField from 'material-ui/TextField';
import {
  Card, CardActions, CardHeader,
  CardMedia, CardTitle, CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import UserSelector from './UserSelector';

class WebhookForm extends Component {
  constructor(props) {
    super(props);
    const {
      url = '',
      user_id: user = null,
    } = this.props;
    this.state = {
      url: url,
      user: user,
    };
    this.submit = this.submit.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.handleChangeURL = this.handleChange.bind(this, "url")
  }

  handleChange(column, event) {
    this.setState({
      [column]: event.target.value
    })
  }

  submit() {
    this.props.submit({
      user: this.state.user,
      url: this.state.url,
    });
    this.setState({ url: '' });
  }

  changeUser(user) {
    this.setState({ user });
  }

  componentWillReceiveProps(props) {
    this.setState({
      user: props.currentUser
    });
  }

  render() {
    const { webhook, editMode = false } = this.props;
    const { url, user } = this.state;
    const disabled = user == null || url.length == 0;
    return (
      <Card>
        <CardTitle title="Create a New Webhook" />
        <CardText>
          <UserSelector
            floatingLabelText="A face for this webhook"
            user={this.state.user}
            changeUser={this.changeUser}
          />
          <br />
          <TextField
            hintText="Endpoint"
            floatingLabelText="URL"
            value={url}
            onChange={this.handleChangeURL}
          />
        </CardText>
        <CardActions>
          <RaisedButton
            label="Submit"
            primary={true}
            onClick={this.submit}
            disabled={disabled}
          />
        </CardActions>
      </Card>
    );
  }
}

export default WebhookForm

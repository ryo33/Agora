import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Map } from 'immutable';

import TextField from 'material-ui/TextField';
import {
  Card, CardActions, CardHeader,
  CardMedia, CardTitle, CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import UserSelector from './UserSelector';

const mapStateToProps = ({ account }) => {
  return {
    currentUser: account.currentUser,
  };
};

class ThreadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title || '',
      user: this.props.currentUser,
    };
    this.submit = this.submit.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  handleChange(column, event) {
    this.setState({
      [column]: event.target.value
    })
  }

  submit() {
    this.props.submit({
      user: this.state.user,
      title: this.state.title
    })
    this.setState({ title: '' })
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
    return (
      <Card>
        <CardTitle title="New Thread" />
        <CardText>
          <TextField
            hintText="Title"
            floatingLabelText="Title"
            value={this.state.title}
            onChange={this.handleChange.bind(this, 'title')}
          />
        </CardText>
        <CardActions>
          <RaisedButton
            label="Submit"
            primary
            onClick={this.submit}
          />
          <UserSelector
            user={this.state.user}
            changeUser={this.changeUser}
          />
        </CardActions>
      </Card>
    );
  }
}

export default connect(mapStateToProps)(ThreadForm);

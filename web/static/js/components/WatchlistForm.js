import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import {
  Card, CardActions, CardHeader,
  CardMedia, CardTitle, CardText
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import UserSelector from './UserSelector';

const mapStateToProps = ({ account }) => {
  return {
    currentUser: account.currentUser,
  };
};

class WatchlistForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name || '',
      user: this.props.currentUser,
    };
    this.submit = this.submit.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.handleNameChange = this.handleChange.bind(this, 'name');
  }

  handleChange(column, event) {
    this.setState({
      [column]: event.target.value
    })
  }

  submit() {
    this.props.submit({
      user: this.state.user,
      name: this.state.name
    });
    this.setState({ name: '' });
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
    const { user, name } = this.state;
    const disabled = user == null || name.length == 0;
    return (
      <Card>
        <CardTitle title="New Watchlist" />
        <CardText>
          <TextField
            hintText="Name"
            floatingLabelText="Name"
            value={name}
            onChange={this.handleNameChange}
          />
        </CardText>
        <CardActions>
          <RaisedButton
            label="Submit"
            primary
            onClick={this.submit}
            disabled={disabled}
          />
          <UserSelector
            user={user}
            changeUser={this.changeUser}
          />
        </CardActions>
      </Card>
    );
  }
}

export default connect(mapStateToProps)(WatchlistForm);

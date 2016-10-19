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
import Toggle from 'material-ui/Toggle';

import UserSelector from './UserSelector';

const mapStateToProps = ({ account, groups }, { members, group, zDepth }) => {
  if (group == null) {
    members == null;
  } else if (groups[group] == null) {
    members = [];
  } else if (groups[group].thread_limited != true) {
    members = null;
  }
  zDepth = zDepth || 0
  return {
    currentUser: account.currentUser,
    members,
    zDepth
  };
};

class ThreadForm extends Component {
  constructor(props) {
    super(props);
    const {
      title = '',
      user_id: user = null,
      post_limited: postLimited = false,
    } = this.props;
    this.state = {
      title: title,
      user: user || this.props.currentUser,
      postLimited
    };
    this.submit = this.submit.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.handleTogglePost = this.handleTogglePost.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
  }

  handleChangeTitle(event) {
    this.setState({
      title: event.target.value
    })
  }

  handleTogglePost() {
    this.setState({
      postLimited: ! this.state.postLimited
    });
  }

  submit() {
    this.props.submit({
      user: this.state.user,
      title: this.state.title,
      postLimited: this.state.postLimited
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
    const {
      editMode = false, group, members, zDepth,
      titleText = "Create a New Thread"
    } = this.props;
    const { title, user, postLimited } = this.state;
    const disabled = user == null || title.length == 0;
    return (
      <Card zDepth={zDepth}>
        <CardTitle title={titleText} />
        <CardText>
          <TextField
            hintText="Title"
            floatingLabelText="Title"
            value={title}
            onChange={this.handleChangeTitle}
          />
          {
            group != null
            ? <Toggle
              label="Allow only members to post"
              labelPosition="right"
              toggled={postLimited}
              onToggle={this.handleTogglePost}
            />
            : null
          }
        </CardText>
        <CardActions>
          <RaisedButton
            label="Submit"
            primary={true}
            disabled={this.state.user == null}
            onClick={this.submit}
            disabled={disabled}
          />
          {
            editMode
            ? null
            : <UserSelector
              user={this.state.user}
              members={members}
              changeUser={this.changeUser}
            />
          }
        </CardActions>
      </Card>
    );
  }
}

export default connect(mapStateToProps)(ThreadForm);

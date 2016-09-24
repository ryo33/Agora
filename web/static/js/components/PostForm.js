import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, CardHeader, CardActions, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';

import UserSelector from './UserSelector';

const mapStateToProps = ({ account, threads }, { members, thread }) => {
  if (threads[thread] == null) {
    members = [];
  } else if (threads[thread].post_limited != true) {
    members = null;
  }
  return {
    currentUser: account.currentUser,
    members
  };
};

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleForm: false,
      titleError: '',
      messageError: '',
      title: '',
      text: '',
      user: props.currentUser,
    };
    this.changeUser = this.changeUser.bind(this);
    this.toggleTitle = this.toggleTitle.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
  }

  changeUser(user) {
    this.setState({ user });
  }

  toggleTitle(event) {
    this.setState({ titleForm: !this.state.titleForm });
  }

  submit() {
    const { user, title, text } = this.state;
    this.props.submit({
      user: user,
      title: title,
      text: text,
    });
    this.setState({
      title: '',
      text: '',
    });
  }

  handleChange(column, event) {
    this.setState({[column]: event.target.value});
  }

  handleChangeText(event) {
    this.handleChange('text', event);
  }

  handleChangeTitle(event) {
    this.handleChange('title', event);
  }

  componentWillReceiveProps(props) {
    this.setState({
      user: props.currentUser
    });
  }

  render() {
    const {
      user,
      title, text,
      titleForm, messageError, titleError
    } = this.state;
    const { members, zDepth } = this.props;
    const disabled = user == null || text.length == 0;
    return (
      <Card
        zDepth={zDepth}
      >
        {this.props.expandable
          ? <CardHeader
            title="New Post"
            actAsExpander={true}
            showExpandableButton={true}
          />
            : <CardTitle title="New Post" />
        }
        <CardText expandable={true}>
          <Toggle
            toggled={titleForm}
            onToggle={this.toggleTitle}
            label="Title"
            labelPosition="right"
          />
          {titleForm
            ? <div><TextField
                value={title}
                onChange={this.handleChangeTitle}
                hintText="Title"
                errorText={titleError}
              /><br /></div>
              : null
          }
          <TextField
            value={text}
            onChange={this.handleChangeText}
            hintText="Post"
            floatingLabelText="Post"
            errorText={messageError}
            multiLine
            rows={3}
          />
        </CardText>
        <CardActions expandable>
          <RaisedButton
            label="Submit"
            primary
            onClick={this.submit}
            disabled={disabled}
          />
          <UserSelector
            user={user}
            members={members}
            changeUser={this.changeUser}
          />
        </CardActions>
      </Card>
    );
  }
}

export default connect(mapStateToProps)(PostForm);

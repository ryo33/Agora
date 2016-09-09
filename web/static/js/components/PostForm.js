import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, CardHeader, CardActions, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';

import UserSelector from './UserSelector';

const mapStateToProps = ({ account }) => {
  return {
    currentUser: account.currentUser,
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
    const { user, title, text, titleForm, messageError, titleError } = this.state;
    const { zDepth } = this.props;
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
            disabled={user == null}
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

export default connect(mapStateToProps)(PostForm);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Dialog from 'material-ui/Dialog';

import UserSelector from './UserSelector';

const mapStateToProps = ({ account, groups, theme }, { members, group, open, close }) => {
  if (group == null) {
    members == null;
  } else if (groups[group] == null) {
    members = [];
  } else if (groups[group].thread_limited != true) {
    members = null;
  }
  return {
    currentUser: account.currentUser,
    theme,
    members,
    group,
    open,
    close
  };
};

class ThreadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title || '',
      user: this.props.currentUser,
      postLimited: false
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
    this.props.close
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
    const { group, members, theme } = this.props;
    const { title, user, postLimited } = this.state;
    const disabled = user == null || title.length == 0;
    const actions = [
      <FlatButton
        label="Cansel"
        labelStyle={theme.form.dialog.button.label}
        secondary={true}
        onClick={this.props.close}
      />,
      <FlatButton
        label="Submit"
        labelStyle={theme.form.dialog.button.label}
        primary={true}
        disabled={this.state.user == null}
        onClick={this.submit}
        disabled={disabled}
      />
    ];
    return (
      <Dialog
        title="New Thread"
        titleStyle={theme.form.dialog.title}
        bodyStyle={theme.form.dialog.body}
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.close}
      >
        <div>
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
        </div>
        <UserSelector
          user={this.state.user}
          members={members}
          changeUser={this.changeUser}
        />
      </Dialog>
    );
  }
}

ThreadForm.defaultProps = {open: true, close: () => {}};

export default connect(mapStateToProps)(ThreadForm);

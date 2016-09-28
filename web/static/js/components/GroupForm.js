import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Dialog from 'material-ui/Dialog';

import UserSelector from './UserSelector';

const mapStateToProps = ({ account, groups, theme }, { open, close, members, group }) => {
  if (group == null) {
    members == null;
  } else if (groups[group] == null) {
    members = [];
  } else if (groups[group].group_limited != true) {
    members = null;
  }
  return {
    currentUser: account.currentUser,
    members,
    theme,
    open,
    close
  };
};

class GroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name || "",
      user: this.props.currentUser,
      groupLimited: true,
      threadLimited: true,
      joinLimited: true
    };
    this.submit = this.submit.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.handleChangeName = this.handleChange.bind(this, "name")
    this.handleToggleGroup = this.handleToggleGroup.bind(this);
    this.handleToggleThread = this.handleToggleThread.bind(this);
    this.handleToggleJoin = this.handleToggleJoin.bind(this);
  }

  handleChange(column, event) {
    this.setState({
      [column]: event.target.value
    })
  }

  handleToggleGroup() {
    this.setState({ groupLimited: ! this.state.groupLimited });
  }
  handleToggleThread() {
    this.setState({ threadLimited: ! this.state.threadLimited });
  }
  handleToggleJoin() {
    this.setState({ joinLimited: ! this.state.joinLimited });
  }

  submit() {
    this.props.submit({
      user: this.state.user,
      name: this.state.name,
      groupLimited: this.state.groupLimited,
      threadLimited: this.state.threadLimited,
      joinLimited: this.state.joinLimited
    });
    this.setState({ name: '' });
    this.props.close();
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
    const { name, user, groupLimited, threadLimited, joinLimited } = this.state;
    const disabled = user == null || name.length == 0;
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
        onClick={this.submit}
        disabled={disabled}
      />
    ];
    return <Dialog
      title="New Group"
      titleStyle={theme.form.dialog.title}
      bodyStyle={theme.form.dialog.body}
      actions={actions}
      modal={false}
      open={this.props.open}
      onRequestClose={this.props.close}
    > 
      <TextField
        hintText="Title"
        floatingLabelText="Title"
        value={name}
        onChange={this.handleChangeName}
      />
      <Toggle
        label="Allow only members to create new groups"
        labelPosition="right"
        toggled={groupLimited}
        onToggle={this.handleToggleGroup}
      />
      <Toggle
        label="Allow only members to create new threads"
        labelPosition="right"
        toggled={threadLimited}
        onToggle={this.handleToggleThread}
      />
      <Toggle
        label="Allow only members to add new members"
        labelPosition="right"
        toggled={joinLimited}
        onToggle={this.handleToggleJoin}
      />
      <UserSelector
        user={this.state.user}
        members={members}
        changeUser={this.changeUser}
      />
    </Dialog>
  }
}

GroupForm.defaultProps = {open: true, close: () => {}};

export default connect(mapStateToProps)(GroupForm)

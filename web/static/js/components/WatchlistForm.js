import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import UserSelector from './UserSelector';

const mapStateToProps = ({ account, theme }, { open, close }) => {
  return {
    currentUser: account.currentUser,
    theme,
    open,
    close,
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
    const { theme } = this.props;
    const { user, name } = this.state;
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
    return (
      <Dialog
        title="New Watchlist"
        titleStyle={theme.form.dialog.title}
        bodyStyle={theme.form.dialog.body}
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.close}
      >
        <div>
          <TextField
            hintText="Name"
            floatingLabelText="Name"
            value={name}
            onChange={this.handleNameChange}
          />
        </div>
        <UserSelector
          user={user}
          changeUser={this.changeUser}
        />
      </Dialog>
    );
  }
}

WatchlistForm.defaultProps = {open: true, close: () => {}};

export default connect(mapStateToProps)(WatchlistForm);

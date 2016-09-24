import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { Card, CardActions, CardHeader,
    CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { updateNewUserFormQuery } from 'actions/accountPage/newUserForm';

const mapStateToProps = ({ account, newUserForm }) => {
  return {
    id: account.forms.addUser.id,
    name: account.forms.addUser.name,
    suggestedUserExists: newUserForm.suggestedUserExists,
  };
};

const actionCreators = {
  updateNewUserFormQuery
};

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      idMessage: '',
      nameMessage: '',
      idError: { colors: '#00bcd4', textAlign: 'right' },
      nameError: { colors: '#00bcd4', textAlign: 'right' },
      isDisabled: true,
    };
  }

  componentWillMount() {
    this.setState({
      id: this.props.id,
      name: this.props.name,
    });
  }

  componentWillReceiveProps(props) {
    if (props.suggestedUserExists) {
      this.setState({
        idMessage: 'This id is already exists.',
        idError: true,
      });
    } else {
      this.checkLength(this.state.id, this.state.name)
    }
  }

  checkLength(id, name) {
    const minLen = { id:  3, name: 1 };
    const maxLen = { id: 30, name: 30 };
    let newProps = {};
    const idLen = id.length;
    const nameLen = name.length;

    if (idLen != 0) {
      newProps['id'] = id;
      newProps['idError'] = (idLen < minLen.id || idLen > maxLen.id);
      newProps['idMessage'] = idLen + '/' + maxLen.id;
    } else {
      newProps['id'] = '';
      newProps['idError'] = null;
      newProps['idMessage'] = null;
    }
    if (nameLen != 0) {
      newProps['name'] = name;
      newProps['nameError'] = (nameLen < minLen.name || nameLen > maxLen.name);
      newProps['nameMessage'] = nameLen + '/' + maxLen.name;
    } else {
      newProps['name'] = '';
      newProps['nameError'] = null;
      newProps['nameMessage'] = null;
    }
    this.setState(Object.assign({}, this.state, newProps));
  }

  handleChange(column, event) {
    switch (column) {
      case 'id':
        this.checkLength(event.target.value, this.state.name)
        this.props.updateNewUserFormQuery(event.target.value)
        break;
      case 'name':
        this.checkLength(this.state.id, event.target.value)
        break;
    }
  }

  click() {
    window.accountChannel
      .push('add_user', { uid: this.state.id, name: this.state.name })
      .receive('ok', () => {
        this.props.dispatch(push('/account/users'));
      });
  }

  render() {
    return (<Card>
      <CardTitle title="Add New User" />
      <CardText>
        <TextField
          hintText="ID"
          floatingLabelText="ID"
          errorText={this.state.idMessage}
          errorStyle={this.state.idError ? ({ color: '#F44336', textAlign: 'right' }) : ({ color: '#8BC34A', textAlign: 'right' })}
          value={this.state.id}
          onChange={this.handleChange.bind(this, 'id')}
        /><br />
        <TextField
          hintText="Name"
          floatingLabelText="Name"
          errorText={this.state.nameMessage}
          errorStyle={this.state.nameError ? ({ color: '#F44336', textAlign: 'right' }) : ({ color: '#8BC34A', textAlign: 'right' })}
          value={this.state.name}
          onChange={this.handleChange.bind(this, 'name')}
        /><br />
      </CardText>
      <CardActions>
        <RaisedButton
          label="Submit"
          onClick={this.click.bind(this)}
          disabled={this.state.isDisabled}
        />
      </CardActions>
    </Card>);
  }
}

export default connect(mapStateToProps, actionCreators)(AddUser);

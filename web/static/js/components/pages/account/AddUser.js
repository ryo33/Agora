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
import { submitUser } from 'actions/resources';

const minLen = { id:  3, name: 1 };
const maxLen = { id: 30, name: 30 };

const mapStateToProps = ({ account, newUserForm }) => {
  return {
    id: account.forms.addUser.id,
    name: account.forms.addUser.name,
    suggestedUserExists: newUserForm.suggestedUserExists,
  };
};

const actionCreators = {
  updateNewUserFormQuery,
  submitUser
};

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: ''
    };
  }

  componentWillMount() {
    this.setState({
      id: this.props.id,
      name: this.props.name,
    });
  }

  handleChange(column, event) {
    const value = event.target.value;
    if (column == 'id') {
      this.props.updateNewUserFormQuery(value);
    }
    this.setState({
      [column]: value,
      idExists: null
    })
  }

  click() {
    const params = {
      uid: this.state.id,
      name: this.state.name
    };
    this.props.submitUser(params);
  }

  render() {
    const { suggestedUserExists } = this.props;
    const { id, name } = this.state;
    const idLen = id.length;
    const nameLen = name.length;
    const isValidID = !(idLen < minLen.id || idLen > maxLen.id);
    const isValidName = !(nameLen < minLen.name || nameLen > maxLen.name);
    let idError = !isValidID;
    let idMessage = `${idLen} (min: ${minLen.id}, max: ${maxLen.id})`;
    let nameError = !isValidName;;
    let nameMessage = `${nameLen} (min: ${minLen.name}, max: ${maxLen.name})`;
    if (suggestedUserExists) {
      idError = true;
      idMessage = 'The ID already exists';
    }
    if (idLen == 0) {
      idError = null;
      idMessage = null;
    }
    if (nameLen == 0) {
      nameError = null;
      nameMessage = null;
    }
    const isDisabled = !(isValidID && isValidName);
    return (<Card>
      <CardTitle title="Create a New User" />
      <CardText>
        <TextField
          hintText="ID"
          floatingLabelText="ID"
          errorText={idMessage}
          errorStyle={idError ? ({ color: '#F44336', textAlign: 'right' }) : ({ color: '#8BC34A', textAlign: 'right' })}
          value={id}
          onChange={this.handleChange.bind(this, 'id')}
        /><br />
        <TextField
          hintText="Name"
          floatingLabelText="Name"
          errorText={nameMessage}
          errorStyle={nameError ? ({ color: '#F44336', textAlign: 'right' }) : ({ color: '#8BC34A', textAlign: 'right' })}
          value={name}
          onChange={this.handleChange.bind(this, 'name')}
        /><br />
      </CardText>
      <CardActions>
        <RaisedButton
          label="Submit"
          onClick={this.click.bind(this)}
          disabled={isDisabled}
        />
      </CardActions>
    </Card>);
  }
}

export default connect(mapStateToProps, actionCreators)(AddUser);

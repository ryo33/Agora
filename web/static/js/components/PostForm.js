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
      user: this.props.currentUser,
    };
  }

  changeUser(user) {
    this.setState(Object.assign({}, this.state, { user: user }));
  }

  toggleTitle(event) {
    this.setState(Object.assign({}, this.state, {
      titleForm: !this.state.titleForm,
    }));
  }

  submit() {
    this.props.submit({
      user_id: this.state.user,
      title: this.state.title,
      text: this.state.text,
    });
    this.setState(Object.assign({}, this.state, {
      title: '',
      text: '',
    }));
  }

  handleChange(column, event) {
    let tmp = {};
    tmp[column] = event.target.value;
    this.setState(Object.assign({}, this.state, tmp));
  }

  render() {
    return (<Card
      zDepth={this.props.zDepth}
    >
            {this.props.expandable
                ? <CardHeader
                  title="New Post"
                  actAsExpander
                  showExpandableButton
                />
                : <CardTitle title="New Post" />
            }
            <CardText expandable>
                <Toggle
                  toggled={this.state.titleForm}
                  onToggle={this.toggleTitle.bind(this)}
                  label="Title"
                  labelPosition="right"
                />
                {this.state.titleForm
                    ? <div><TextField
                      value={this.state.title}
                      onChange={this.handleChange.bind(this, 'title')}
                      hintText="Title"
                      errorText={this.state.titleError}
                    /><br /></div>
                    : null
                }
                <TextField
                  value={this.state.text}
                  onChange={this.handleChange.bind(this, 'text')}
                  hintText="Post"
                  floatingLabelText="Post"
                  errorText={this.state.messageError}
                  multiLine
                  rows={3}
                />
            </CardText>
            <CardActions expandable>
                <RaisedButton
                  label="Submit"
                  primary
                  onClick={this.submit.bind(this)}
                />
                <UserSelector
                  user={this.state.user}
                  changeUser={this.changeUser.bind(this)}
                />
            </CardActions>
        </Card>);
  }
}

export default connect(mapStateToProps)(PostForm);

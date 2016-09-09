import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Card, CardActions, CardHeader,
    CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import ThreadForm from 'components/ThreadForm';

import { addThread } from 'actions/accountPage';

const mapStateToProps = () => ({});

const actionCreators = {
  addThread
};

class AddThread extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit({ user, title }) {
    const { addThread } = this.props;
    addThread(user, title);
  }

  render() {
    return (<ThreadForm
      submit={this.submit}
    />);
  }
}

export default connect(mapStateToProps, actionCreators)(AddThread);

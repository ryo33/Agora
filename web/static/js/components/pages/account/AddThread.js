import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Card, CardActions, CardHeader,
    CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import { joinThreadChannel, leaveChannel } from '../../../socket';
import ThreadForm from './../../ThreadForm';

class AddThread extends Component {
  submit(params) {
    window.accountChannel
        .push('thread', {
          action: 'add',
          params: params,
        })
        .receive('ok', ({ id }) => {
          this.props.dispatch(push('/threads/' + id));
        });
  }

  render() {
    return (<ThreadForm
      submit={this.submit.bind(this)}
    />);
  }
}

export default connect()(AddThread);

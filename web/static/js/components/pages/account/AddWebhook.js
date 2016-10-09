import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Card, CardActions, CardHeader,
    CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import WebhookForm from 'components/WebhookForm';

import { submitWebhook } from 'actions/resources';

const actionCreators = {
  submitWebhook
};

class AddWebhook extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(params) {
    const { submitWebhook } = this.props;
    submitWebhook(params);
  }

  render() {
    return <WebhookForm
      submit={this.submit}
    />;
  }
}

export default connect(null, actionCreators)(AddWebhook);

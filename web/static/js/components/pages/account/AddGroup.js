import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Card, CardActions, CardHeader,
    CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import GroupForm from 'components/GroupForm';

import { submitGroup } from 'actions/resources';

const mapStateToProps = () => ({});

const actionCreators = {
  submitGroup
};

class AddGroup extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(params) {
    const { submitGroup } = this.props;
    submitGroup(params);
  }

  render() {
    return <GroupForm
      submit={this.submit}
      zDepth={1}
    />;
  }
}

export default connect(mapStateToProps, actionCreators)(AddGroup);

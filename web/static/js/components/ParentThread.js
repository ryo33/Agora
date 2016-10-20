import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import ellipsize from 'ellipsize';
import { compose } from 'recompose';

import RaisedButton from 'material-ui/RaisedButton';

import ThreadActions from 'components/ThreadActions';
import { requireThread } from 'hocs/resources';
import { ThreadIcon } from 'components/icons';

const defaultStyle = {
  margin: "4px 6px",
}

const MAX_LENGTH = 20;

const actionCreators = {
  push
};

class ParentThread extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { id, push } = this.props;
    push('/threads/' + id);
  }

  render() {
    const {
      id, thread, style = {}
    } = this.props;
    return (
      <RaisedButton
        icon={<ThreadIcon />}
        onClick={this.handleClick}
        label={<span style={{textTransform: 'none'}}>{ellipsize(thread.title, MAX_LENGTH)}</span>}
        style={Object.assign({}, defaultStyle, style)}
      />
    );
  }
}

export default requireThread(null, actionCreators)(ParentThread);

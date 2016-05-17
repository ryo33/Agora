import React, { Component } from 'react';
import { connect } from 'react-redux';

class ThreadPage extends Component {
  render() {
    return this.props.children;
  }
}

export default connect()(ThreadPage);

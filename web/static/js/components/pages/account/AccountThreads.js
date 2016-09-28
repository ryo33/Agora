import React, { Component } from 'react';
import { connect } from 'react-redux';

import ResourceList from 'components/ResourceList';

import { openAccountThreadsPage } from 'actions/accountPage';

const mapStateToProps = ({ accountPage }) => {
  return {
    threads: accountPage.threads
  };
};

const actionCreators = {
  openAccountThreadsPage
};

class AccountThreads extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { openAccountThreadsPage } = this.props;
    openAccountThreadsPage();
  }

  render() {
    const { threads } = this.props;
    return <ResourceList threads={threads} mode='thread'/>
  }
}

export default connect(mapStateToProps, actionCreators)(AccountThreads);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import ThreadList from 'components/ThreadList';

import { openAllThreadsPage } from 'actions/threadPage';

const mapStateToProps = ({ threadPage }) => {
  return {
    threads: threadPage.threads
  };
};

const actionCreators = {
  openAllThreadsPage
};

class ThreadAll extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { openAllThreadsPage } = this.props;
    openAllThreadsPage();
  }

  render() {
    const { threads } = this.props;
    return (
      <div>
        <ThreadList threads={threads} />
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(ThreadAll);

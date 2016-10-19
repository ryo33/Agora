import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requireThread } from 'hocs/resources';

const mapStateToProps = ({ threads }, { id }) => {
  return {
    thread: threads[id],
  };
};

const ThreadTitle = ({ thread }) => <span>{thread.title}</span>;

export default connect(mapStateToProps)(requireThread(ThreadTitle));

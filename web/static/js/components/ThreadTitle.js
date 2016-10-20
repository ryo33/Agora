import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requireThread } from 'hocs/resources';

const ThreadTitle = ({ thread }) => <span>{thread.title}</span>;

export default requireThread()(ThreadTitle);

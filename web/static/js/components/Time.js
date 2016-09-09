import React, { Component } from 'react';

import moment from 'moment';

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalID: null,
      isMounted: true,
      date: '',
    };
    moment.locale(navigator.language);
    this.format = this.format.bind(this);
  }

  componentWillMount() {
    this.format();
    let intervalID = setInterval(this.format, 1000);
    this.setState({ intervalID: intervalID });
  }

  componentWillUnmount() {
    if (this.state.intervalID != null) clearInterval(this.state.intervalID);
    this.setState({ intervalID: null,  isMounted: false });
  }

  format() {
    let insertedAt = moment.parseZone(this.props.time).local();
    let now = moment().local();
    let date = '';
    if (now.diff(insertedAt, 'year') >= 1) {
      date = insertedAt.format('LTS');
    } else if (now.diff(insertedAt, 'days') >= 1) {
      date = insertedAt.format('MMM Do LT');
    } else {
      date = insertedAt.fromNow();
    }
    if (this.state.isMounted) this.setState({ date: date });
  }

  render() {
    return (<span>
      {this.state.date}
    </span>);
  }
}

export default Time;

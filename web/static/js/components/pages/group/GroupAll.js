import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { openAllGroupsPage } from 'actions/groupPage';

import ResourceList from 'components/ResourceList';

const mapStateToProps = ({ groupPage }) => {
  return {
    groups: groupPage.groups
  }
};

const actionCreators = {
  openAllGroupsPage
};

class GroupAll extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { openAllGroupsPage } = this.props;
    openAllGroupsPage();
  }

  transitionTo(path) {
    return () => {
      this.props.dispatch(push(path));
    }
  }

  render() {
    const { groups } = this.props;
    return <ResourceList groups={groups} mode='group'/>
  }
}

export default connect(mapStateToProps, actionCreators)(GroupAll)

import React, { Component } from 'react'
import { connect } from 'react-redux'

import ResourceList from 'components/ResourceList';

import { openAccountGroupsPage } from 'actions/accountPage';

const mapStateToProps = ({ accountPage }) => {
  return {
    groups: accountPage.groups
  };
};

const actionCreators = {
  openAccountGroupsPage
};

class AccountGroups extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { openAccountGroupsPage } = this.props;
    openAccountGroupsPage();
  }

  render() {
    const { groups } = this.props;
    return (
      <div>
        <ResourceList groups={groups} />
      </div>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(AccountGroups)

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Group from 'components/Group'

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
        {
          groups.map(id => (
            <Group
              key={id}
              id={id}
            />
          ))
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(AccountGroups)

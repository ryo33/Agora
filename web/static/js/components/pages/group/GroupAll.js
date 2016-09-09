import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Group from 'components/Group';

import { openAllGroupsPage } from 'actions/groupPage';

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
    return (
      <div>
        {groups.map(id => <Group
          key={id}
          id={id}
        />)}
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(GroupAll)

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requireGroup } from 'hocs/resources';

const mapStateToProps = ({ groups }, { id }) => {
  return {
    group: groups[id],
  };
};

const GroupTitle = ({ group }) => <span>{group.name}</span>;

export default connect(mapStateToProps)(requireGroup(GroupTitle));

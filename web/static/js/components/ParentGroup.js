import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import ellipsize from 'ellipsize';

import RaisedButton from 'material-ui/RaisedButton';

import GroupActions from 'components/GroupActions';
import { requireGroup } from 'hocs/resources';
import { GroupIcon } from 'components/icons';

const MAX_LENGTH = 20;

const mapStateToProps = ({ theme, groups }, { id }) => {
  return {
    group: groups[id],
  }
};

const actionCreators = {
  push
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(actionCreators, dispatch),
    dispatch
  };
};

class ParentGroup extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { id, push } = this.props;
    push('/groups/' + id);
  }

  render() {
    const { id, group } = this.props;
    return (
      <RaisedButton
        icon={<GroupIcon />}
        onClick={this.handleClick}
        label={ellipsize(group.name, MAX_LENGTH)}
        style={{margin: "4px 6px"}}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(requireGroup(ParentGroup));

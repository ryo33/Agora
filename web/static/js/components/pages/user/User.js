import React, { Component } from 'react';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';

import ThreadHeader from 'components/pages/thread/ThreadHeader'
import UserComponent from 'components/User';

const mapStateToProps = ({ userIDs }, { params }) => {
  const id = userIDs[params.id];
  return {
    id
  };
}

class User extends Component {
  render() {
    const { id } = this.props;
    return (
      <div>
        {
          id != null
          ? <UserComponent
            id={id}
          />
          : null
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(User);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import CopyAction from 'components/resourceActions/CopyAction';

const mapStateToProps = ({ users }, { id }) => {
  const uid = users[id] ? users[id].uid : null;
  return {
    id: uid
  };
}

class UserActions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id } = this.props;
    return (
      <div>
        {
          id != null
          ? <CopyAction
            link={`users/${id}`}
          />
          : null
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(UserActions);

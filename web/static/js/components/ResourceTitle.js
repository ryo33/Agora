import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import moment from 'moment';

import TimeAgo from 'react-timeago';

import { requireUser } from 'hocs/resources';

const mapStateToProps = ({ users }, { user, insertedAt }) => {
  return {
    id: user,
    user: users[user],
    insertedAt: moment.utc(insertedAt).format()
  };
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

const ResourceTitle = ({ push, user, title, path, onClick, linkedTitle, insertedAt }) => <span>
  <span
    style={{cursor: 'pointer'}}
    onClick={onClick || (() => push('/users/' + user.uid))}
  >
    {user.name}
    <small
      style={{
        marginLeft: '0.2em',
        marginRight: '1.2em',
      }}
      children={'@' + user.uid}
    />
  </span>
  <span
    style={{ cursor: 'pointer' }}
    onClick={path
      ? () => push(path)
      : () => null
    }
  >
    <strong>{title}</strong>
  </span>
  <span
    style={{
      marginLeft: '1.0em',
    }}
  >
    <TimeAgo date={insertedAt} />
  </span>
</span>;

export default connect(mapStateToProps, mapDispatchToProps)(requireUser(ResourceTitle));

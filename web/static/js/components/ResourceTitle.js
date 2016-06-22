import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Time from 'components/Time';

const ResourceTitle = ({ dispatch, user, title, path, onClick, linkedTitle, insertedAt }) => <span>
  <span
    style={{cursor: 'pointer'}}
    onClick={onClick || (() => dispatch(push('/users/' + user.uid)))}
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
      ? () => dispatch(push(path))
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
    <Time time={insertedAt} />
  </span>
</span>;

export default connect()(ResourceTitle);

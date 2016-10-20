import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import moment from 'moment'

import TimeAgo from 'react-timeago'

import { requireUser } from 'hocs/resources'

const mapStateToProps = (state, { user, insertedAt }) => {
  return {
    id: user,
    insertedAt: moment.utc(insertedAt).format(),
  }
}

const actionCreators = {
  push,
}

const ResourceTitle = ({ push, user, title, path, onClick, linkedTitle, insertedAt }) => (
  <span
    style={{
      fontSize: '0.9em',
    }}
  >
    <span
      style={{
        cursor: 'pointer',
      }}
      onClick={onClick || (() => push(`/users/${user.uid}`))}
    >
      <span style={{
        fontWeight: 'bold',
      }}
      >
        {user.name}
      </span>
      <small
        style={{
          marginLeft: '0.2em',
          marginRight: '1.2em',
        }}
        children={`@${user.uid}`}
      />
    </span>
    <span
      style={{ cursor: 'pointer' }}
      onClick={() => push(path)}
    >
      <strong>{title}</strong>
      <span
        style={{
          marginLeft: '1.0em',
        }}
      >
        <TimeAgo date={insertedAt} />
      </span>
    </span>
  </span>
)

export default requireUser(mapStateToProps, actionCreators, 'user')(ResourceTitle)

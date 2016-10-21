import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'

import { SignedIn } from 'components/util'
import { Group, Thread, Post, Member } from 'components/listItems'

import {
  openWatchlistPage,
  closeWatchlistPage,
} from 'actions/watchlistPage'
import WatchlistHeader from 'components/WatchlistHeader'

const styles = {
  divider: {
    marginTop: '2%',
    marginBottom: '2%',
  },
  paper: {
    padding: '1% 2%',
    marginLeft: '2%',
  },
}

const mapStateToProps = ({ watchlistPage }, { params }) => {
  return {
    items: watchlistPage.items,
    id: parseInt(params.id, 10),
  }
}

const actionCreaters = {
  openWatchlistPage, closeWatchlistPage,
}

class Watchlist extends Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { openWatchlistPage, id } = this.props
    openWatchlistPage(id)
  }

  componentWillUnmount() {
    const { closeWatchlistPage, id } = this.props
    closeWatchlistPage(id)
  }

  render() {
    const {
      id, theme, items,
    } = this.props
    return (
      <div>
        <WatchlistHeader id={id} />
        <Divider style={styles.divider} />
        {items.map(showItem)}
      </div>
    )
  }
}

function showItem(item, index) {
  const { type, id } = item
  switch (type) {
    case 'thread_new_post':
      return (
        <Post
          key={`${id}p${index}`}
          id={id}
        />
      )
    case 'group_new_group':
      return (
        <Group
          key={`${id}g${index}`}
          id={id}
        />
      )
    case 'group_new_thread':
      return (
        <Thread
          key={`${id}t${index}`}
          id={id}
        />
      )
    case 'group_new_member':
      return (
        <Member
          key={`${id}m${index}`}
          group={item.group_id}
          id={id}
        />
      )
    default:
      return null
  }
}

export default connect(mapStateToProps, actionCreaters)(Watchlist)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { compose } from 'recompose'

import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'

import { SignedIn } from 'components/util'
import ListItem from 'components/ListItem'
import {
  openWatchlistItemsPage,
  closeWatchlistItemsPage,
} from 'actions/watchlistPage'
import {
  unwatchThread, unwatchGroup
} from 'actions/resources'
import { requireWatchlist } from 'hocs/resources'
import WatchlistHeader from 'components/WatchlistHeader'
import { GroupIcon, ThreadIcon, DeleteIcon } from 'components/icons'
import GroupTitle from 'components/GroupTitle'
import ThreadTitle from 'components/ThreadTitle'

const styles = {
  divider: {
    marginTop: '2%',
    marginBottom: '2%',
  },
}

const actionCreators = {
  push, unwatchThread, unwatchGroup
}

class ItemsComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { id: watchlistID, watchlist, push, unwatchThread, unwatchGroup } = this.props
    const { watch_threads: threads, watch_groups: groups } = watchlist
    return (
      <div>
        {
          threads.map(id => (
            <ListItem key={id} handleClick={() => push('/threads/' + id)}>
              <ThreadIcon />
              <span style={{margin: "0px 10px"}}><ThreadTitle id={id} /></span>
              <RaisedButton
                icon={<DeleteIcon />}
                label="Unwatch"
                onClick={(event) => {
                  event.stopPropagation()
                  unwatchThread(watchlistID, id)
                }}
              />
            </ListItem>
          ))
        }
        {
          groups.map(id => (
            <ListItem key={id} handleClick={() => push('/groups/' + id)}>
              <GroupIcon />
              <span style={{margin: "0px 10px"}}><GroupTitle id={id} /></span>
              <RaisedButton
                icon={<DeleteIcon />}
                label="Unwatch"
                onClick={(event) => {
                  event.stopPropagation()
                  unwatchGroup(watchlistID, id)
                }}
              />
            </ListItem>
          ))
        }
      </div>
    )
  }
}

const Items = requireWatchlist(null, actionCreators)(ItemsComponent)

const mapStateToProps = ({ watchlistPage }, { params }) => {
  const id = parseInt(params.id, 10)
  return {
    id,
  }
}

const actionCreators2 = {
  openWatchlistItemsPage, closeWatchlistItemsPage,
}

class WatchlistItems extends Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { openWatchlistItemsPage, id } = this.props
    openWatchlistItemsPage(id)
  }

  componentWillUnmount() {
    const { closeWatchlistItemsPage, id } = this.props
    closeWatchlistItemsPage(id)
  }

  render() {
    const {
      id, theme, items,
    } = this.props
    return (
      <div>
        <WatchlistHeader id={id} />
        <Divider style={styles.divider} />
        <Items id={id} />
      </div>
    )
  }
}

export default connect(mapStateToProps, actionCreators2)(WatchlistItems)

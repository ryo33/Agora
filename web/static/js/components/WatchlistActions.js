import React, { Component } from 'react'
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'

import WatchAction from 'components/resourceActions/WatchAction'
import CopyAction from 'components/resourceActions/CopyAction'
import EditWatchlistAction from 'components/resourceActions/EditWatchlistAction'

const Items = ({ onClick }) => (
  <FlatButton
    onClick={onClick}
    label="Manage Items"
  />
)

class WatchlistActions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { id, push, isOwned, watchWatchlist } = this.props
    return (
      <div>
        <CopyAction
          link={`watchlists/${id}`}
        />
        {
          isOwned
          ? <Items onClick={() => push(`/watchlists/${id}/items`)} />
          : null
        }
        {
          isOwned
          ? <EditWatchlistAction id={id} />
          : null
        }
      </div>
    )
  }
}

export default WatchlistActions

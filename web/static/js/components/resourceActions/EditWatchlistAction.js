import React, { Component } from 'react'
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

import WatchlistForm from 'components/WatchlistForm'
import { EditIcon } from 'components/icons/index'
import { editWatchlist } from 'actions/resources'

const mapStateToProps = ({ watchlists }, { id }) => {
  const watchlist = watchlists[id]
  return {
    watchlist,
  }
}

const actionCreators = {
  editWatchlist,
}

class EditWatchlistAction extends Component {
  constructor(props) {
    super(props)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.submit = this.submit.bind(this)
    this.state = {
      isOpen: false,
    }
  }

  open() { this.setState({ isOpen: true }) }
  close() { this.setState({ isOpen: false }) }

  submit(params) {
    const { id, editWatchlist } = this.props
    this.close()
    editWatchlist(id, params)
  }

  render() {
    const { id, watchlist } = this.props
    return (
      <span>
        <FlatButton
          icon={<EditIcon />}
          label="Edit"
          onClick={this.open}
        />
        <Dialog
          open={this.state.isOpen}
          onRequestClose={this.close}
          bodyStyle={{ padding: 0 }}
        >
          <WatchlistForm
            titleText={'Edit this Watchlist'}
            close={this.close}
            submit={this.submit}
            editMode={true}
            {...watchlist}
          />
        </Dialog>
      </span>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(EditWatchlistAction)

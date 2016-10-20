import React, { Component } from 'react'
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

import ThreadForm from 'components/ThreadForm'
import { EditIcon } from 'components/icons/index'
import { editThread } from 'actions/resources'

const mapStateToProps = ({ threads }, { id }) => {
  const thread = threads[id]
  return {
    thread,
  }
}

const actionCreators = {
  editThread,
}

class EditThreadAction extends Component {
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
    const { id, editThread } = this.props
    this.close()
    editThread(id, params)
  }

  render() {
    const { id, thread } = this.props
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
          <ThreadForm
            titleText={'Edit this Thread'}
            close={this.close}
            submit={this.submit}
            editMode
            group={thread.parent_group_id}
            {...thread}
          />
        </Dialog>
      </span>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(EditThreadAction)

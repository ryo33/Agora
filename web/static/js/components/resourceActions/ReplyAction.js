import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

import PostForm from 'components/PostForm'
import { ReplyIcon } from 'components/icons/index'
import { submitPost } from 'actions/resources'
import { onlySignedIn } from 'hocs/global'
import { requirePost } from 'hocs/resources'

const mapStateToProps = ({ threadPage }) => {
  return {
    members: threadPage.members,
    user: threadPage.user,
  }
}

const actionCreators = {
  submitPost,
}

class ReplyAction extends Component {
  constructor(props) {
    super(props)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.submit = this.submit.bind(this)
    this.state = {
      isOpen: false,
    }
  }

  open(event) {
    event.stopPropagation()
    this.setState({ isOpen: true })
  }

  close() { this.setState({ isOpen: false }) }

  submit(params) {
    this.close()
    const { id, members, submitPost, post } = this.props
    submitPost(Object.assign(params, { thread: post.thread_id, post: id }))
  }

  render() {
    const { id, post, user, members } = this.props
    return (
      <span>
        <FlatButton
          icon={<ReplyIcon />}
          label="Reply"
          onClick={this.open}
        />
        <Dialog
          open={this.state.isOpen}
          onRequestClose={this.close}
          bodyStyle={{ padding: 0 }}
        >
          <PostForm
            post={id}
            thread={post.thread_id}
            user={user}
            members={members}
            submit={this.submit}
            zDepth={2}
          />
        </Dialog>
      </span>
    )
  }
}

export default compose(onlySignedIn, requirePost(mapStateToProps, actionCreators))(ReplyAction)

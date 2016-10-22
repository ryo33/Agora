import React, { Component } from 'react'
import { connect } from 'react-redux'

import { push } from 'react-router-redux'
import ellipsize from 'ellipsize'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

import Post from 'components/Post'
import PostActions from 'components/PostActions'
import { requirePost } from 'hocs/resources'
import { PostIcon } from 'components/icons'

const defaultStyle = {
  margin: '4px 6px',
}

const MAX_LENGTH = 20

const actionCreators = {
  push,
}

class PostButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.showPost = this.showPost.bind(this)
    this.hidePost = this.hidePost.bind(this)
  }

  showPost(event) {
    event.stopPropagation()
    this.setState({ open: true })
  }
  hidePost(event) {
    event.stopPropagation()
    this.setState({ open: false })
  }

  getText(post) {
    if (post.title && post.title.length > 0) {
      return ellipsize(post.title, MAX_LENGTH)
    } else {
      return ellipsize(post.text, MAX_LENGTH)
    }
  }

  render() {
    const {
      id, post, style = {},
    } = this.props
    const open = this.state.open
    if (open) {
      return (
        <Paper>
          <RaisedButton
            onClick={this.hidePost}
            label="Hide"
          />
          <Post id={id} />
        </Paper>
      )
    } else {
      return (
        <RaisedButton
          icon={<PostIcon />}
          onClick={this.showPost}
          label={<span style={{ textTransform: 'none' }}>{this.getText(post)}</span>}
          style={Object.assign({}, defaultStyle, style)}
        />
      )
    }
  }
}

export default requirePost(null, actionCreators)(PostButton)

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Divider from 'material-ui/Divider'

import ThreadHeader from 'components/ThreadHeader'
import PostComponent from 'components/Post'

const mapStateToProps = ({ posts }, { params }) => {
  const postID = parseInt(params.id, 10)
  const threadID = posts[postID] ? posts[postID].thread_id : null
  return {
    postID, threadID,
  }
}

class Post extends Component {
  render() {
    const { postID, threadID } = this.props
    return (
      <div>
        {
          threadID != null
          ? <div id="thread-header">
            <ThreadHeader id={threadID} />
          </div>
          : null
        }
        <Divider style={{ margin: '1em 0' }} />
        {
          <PostComponent
            id={postID}
          />
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Post)

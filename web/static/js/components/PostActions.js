import React, { Component } from 'react'

import CopyAction from 'components/resourceActions/CopyAction'
import ReplyAction from 'components/resourceActions/ReplyAction'

class PostActions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { id } = this.props
    return (
      <div>
        <ReplyAction
          id={id}
        />
        <CopyAction
          link={`posts/${id}`}
        />
      </div>
    )
  }
}

export default PostActions

import React, { Component } from 'react'

import CopyAction from 'components/resourceActions/CopyAction'

class PostActions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { id } = this.props
    return (
      <div>
        <CopyAction
          link={`posts/${id}`}
        />
      </div>
    )
  }
}

export default PostActions

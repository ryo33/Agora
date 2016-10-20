import React, { Component } from 'react'
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import CopyToClipboard from 'react-copy-to-clipboard'

import { CopyLinkIcon } from 'components/icons/index'
import { showInfo } from 'actions/global'

const actionCreators = {
  showInfo,
}

class CopyAction extends Component {
  constructor(props) {
    super(props)
    this.handleCopy = this.handleCopy.bind(this)
  }

  handleCopy() {
    this.props.showInfo('Copied!')
  }

  render() {
    const { link } = this.props
    return (
      <CopyToClipboard
        text={`${location.protocol}//${location.host}/${link}`}
        onCopy={this.handleCopy}
      >
        <FlatButton
          icon={<CopyLinkIcon />}
          label="Copy link"
        />
      </CopyToClipboard>
    )
  }
}

export default connect(null, actionCreators)(CopyAction)

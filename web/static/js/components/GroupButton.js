import React, { Component } from 'react'
import { push } from 'react-router-redux'
import ellipsize from 'ellipsize'

import RaisedButton from 'material-ui/RaisedButton'

import GroupActions from 'components/GroupActions'
import { requireGroup } from 'hocs/resources'
import { GroupIcon } from 'components/icons'

const defaultStyle = {
  margin: '4px 6px',
}

const MAX_LENGTH = 20

const actionCreators = {
  push,
}

class GroupButton extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    const { id, push } = this.props
    push(`/groups/${id}`)
    event.stopPropagation()
  }

  render() {
    const {
      id, group, style = {},
    } = this.props
    return (
      <RaisedButton
        icon={<GroupIcon />}
        onClick={this.handleClick}
        label={<span style={{ textTransform: 'none' }}>{ellipsize(group.name, MAX_LENGTH)}</span>}
        style={Object.assign({}, defaultStyle, style)}
      />
    )
  }
}

export default requireGroup(null, actionCreators)(GroupButton)

import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import FlatButton from 'material-ui/FlatButton'

const LinkAction = ({ label, push, href }) => (
  <FlatButton
    label={label}
    onClick={() => push(href)}
  />
)

export default connect(null, { push })(LinkAction)

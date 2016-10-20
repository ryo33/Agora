import React, { Component } from 'react'
import { connect } from 'react-redux'

import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'

import { AddBoxIcon } from 'components/icons/index'
import { signedIn } from 'global'

const menuItems = [
  {
    signedIn: true,
    children: 'Thread Webhooks',
    path: '/account/thread-webhooks',
  },
]

const Account = props => (
  <MenuItem
    children="Account"
    disabled={!signedIn}
    menuItems={
      menuItems.map(({ children, leftIcon, path, signedIn: only }) =>
        <MenuItem
          children={children}
          leftIcon={leftIcon}
          onClick={props.click(path, only)}
          disabled={only && !signedIn}
        />
      ).filter(mi => mi != null)
    }
    rightIcon={<ArrowDropRight />}
  />
)

export default Account

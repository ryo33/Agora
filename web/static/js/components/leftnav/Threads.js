import React, { Component } from 'react'
import { connect } from 'react-redux'

import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'

import { AddBoxIcon, ThreadIcon } from '../icons/index'

const Threads = (props) => <MenuItem
    children="Threads"
    menuItems={[
        <MenuItem
            children="Create New Thread"
            leftIcon={AddBoxIcon}
            onClick={props.click('/account/new-thread')}
        />
    ]}
    rightIcon={<ArrowDropRight />}
    leftIcon={ThreadIcon}
/>

export default Threads

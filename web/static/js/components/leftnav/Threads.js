import React, { Component } from 'react'
import { connect } from 'react-redux'

import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'

import { AddBoxIcon, ThreadIcon } from '../icons/index'

let menuItems = [
    {
        children: "All Your Threads",
        leftIcon: ThreadIcon,
        path: '/account/threads'
    },
    {
        children: "Create New Thread",
        leftIcon: AddBoxIcon,
        path: '/account/add-thread'
    },
]


const Threads = (props) => <MenuItem
    children="Threads"
    menuItems={menuItems.map(({ children, leftIcon, path }) => <MenuItem
        children={children}
        leftIcon={leftIcon}
        onClick={props.click(path)}
    />)}
    rightIcon={<ArrowDropRight />}
    leftIcon={ThreadIcon}
/>

export default Threads

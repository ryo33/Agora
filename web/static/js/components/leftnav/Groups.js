import React, { Component } from 'react'
import { connect } from 'react-redux'

import MenuItem from 'material-ui/MenuItem'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'

import { AddBoxIcon, GroupIcon } from '../icons/index'

const Groups = (props) => <MenuItem
    children="Groups"
    menuItems={[
        <MenuItem
            children="Create New Group"
            leftIcon={AddBoxIcon}
            onClick={props.click('/account/add-group')}
        />,
    ]}
    rightIcon={<ArrowDropRight />}
    leftIcon={GroupIcon}
/>


export default Groups

import React, { Component } from 'react'
import { connect } from 'react-redux'

import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon'

const Users = (props) => <MenuItem
    children="Users"
    onClick={props.transitionTo('/account/users')}
    leftIcon={
        <FontIcon
            children="person"
            className="material-icons"
        />
    }
/>

export default Users

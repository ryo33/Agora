import React, { Component } from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const handleSignout = () => {
    window.location.href = "/auth/logout"
}
const SignoutDialog = (props) => <Dialog
    title="Sign out"
    children="Are you sure you want to sign out?"
    actions={[
        <FlatButton
            label="Sign out"
            primary={true}
            keyboardFocused={true}
            onTouchTap={handleSignout}
        />,
        <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={props.handleSignoutCancel}
        />
    ]}
    modal={false}
    open={props.isSignoutDialogOpen}
    onRequestClose={props.handleSignoutCancel}
/>

export default SignoutDialog

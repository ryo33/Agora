import React, { Component } from 'react'
import SvgIcon from 'material-ui/lib/svg-icon'
import google from './../../svg/google.svg'
import RaisedButton from 'material-ui/lib/raised-button'
/*
*/
const Google = (props) => <RaisedButton
    label="Sign in with Google"
    icon={<SvgIcon dangerouslySetInnerHTML={{ __html: google }} />}
    linkButton={true}
    href="/auth/google"
/>
const SignIn = (props) => <div>
    <Google />
</div>

export default SignIn

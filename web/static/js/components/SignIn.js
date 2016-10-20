import React, { Component } from 'react'
import SvgIcon from 'material-ui/SvgIcon'
import google from './../../svg/google.svg'
import RaisedButton from 'material-ui/RaisedButton'

import { onlyNotSignedIn } from 'hocs/global'

const style = {
  marginTop: '7px',
}

const Google = props => <RaisedButton
  style={style}
  label="Sign in with Google"
  icon={<SvgIcon dangerouslySetInnerHTML={{ __html: google }} />}
  href="/auth/google"
/>

const Facebook = props => <RaisedButton
  style={style}
  label="Sign in with Facebook"
  href="/auth/facebook"
/>

const Github = props => <RaisedButton
  style={style}
  label="Sign in with GitHub"
  href="/auth/github"
/>

const SignIn = props => (
  <div>
    <Google /><br />
    <Facebook /><br />
    <Github />
  </div>
)

export default onlyNotSignedIn(SignIn)

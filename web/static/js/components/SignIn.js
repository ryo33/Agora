import React, { Component } from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import google from './../../svg/google.svg';
import RaisedButton from 'material-ui/RaisedButton';

import { onlyNotSignedIn } from 'hocs/global';

const Google = (props) => <RaisedButton
  label="Sign in with Google"
  icon={<SvgIcon dangerouslySetInnerHTML={{ __html: google }} />}
  linkButton
  href="/auth/google"
/>;
const SignIn = (props) => (
  <div>
  <Google />
</div>
);

export default onlyNotSignedIn(SignIn);

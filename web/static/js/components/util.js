import React from 'react';

import { signedIn } from 'global';

const signed = ({ children }, value) => {
  if (signedIn == value) {
    return <span>{children}</span>;
  } else {
    return null;
  }
};

const SignedIn = (props) => signed(props, true);

const NotSignedIn = (props) => signed(props, false);

export { SignedIn, NotSignedIn };

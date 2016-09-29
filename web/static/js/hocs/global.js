import {
  branch, compose, lifecycle, renderNothing, renderComponent
} from 'recompose';

import { signedIn } from 'global';
import NotSignedIn from 'components/NotSignedIn';

export function onlySignedIn(component) {
  return signedIn ? component : NotSignedIn;
}

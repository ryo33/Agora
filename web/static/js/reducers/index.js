import { globalInfo } from './global';

import account from './account/index';

import { threads, posts, users, groups, watchlists, userIDs } from './resources';

import threadPage from './threadPage';
import groupPage from './groupPage';
import accountPage from './accountPage';
import watchlistPage from './watchlistPage';

import userForm from './userForm';

import newUserForm from './accountPage/newUserForm'

import theme from './theme';

const reducers = {
  globalInfo,
  account,
  threads,
  groups,
  posts,
  users,
  userIDs,
  watchlists,
  threadPage,
  groupPage,
  accountPage,
  watchlistPage,
  userForm,
  newUserForm,
  theme,
};

export default reducers;

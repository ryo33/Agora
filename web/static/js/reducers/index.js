import { globalInfo, isLoading } from './global';

import account from './account/index';

import {
  threads, posts, users, groups, watchlists, webhooks, userIDs
} from './resources';

import threadPage from './threadPage';
import groupPage from './groupPage';
import accountPage from './accountPage';
import watchlistPage from './watchlistPage';

import userForm from './userForm';

import newUserForm from './accountPage/newUserForm'

import theme from './theme';

const reducers = {
  globalInfo,
  isLoading,
  account,
  threads,
  groups,
  posts,
  users,
  userIDs,
  watchlists,
  webhooks,
  threadPage,
  groupPage,
  accountPage,
  watchlistPage,
  userForm,
  newUserForm,
  theme,
};

export default reducers;

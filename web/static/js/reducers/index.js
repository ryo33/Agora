import account from './account/index';

import { threads, posts, users, groups, watchlists } from './resources';

import threadPage from './threadPage';
import groupPage from './groupPage';
import accountPage from './accountPage';
import watchlistPage from './watchlistPage';

import userForm from './userForm';

import theme from './theme';

const reducers = {
  account,
  threads,
  groups,
  posts,
  users,
  watchlists,
  threadPage,
  groupPage,
  accountPage,
  watchlistPage,
  userForm,
  theme,
};

export default reducers;

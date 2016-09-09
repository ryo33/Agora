import account from './account/index';

import { threads, posts, users, groups } from './resources';

import threadPage from './threadPage';
import groupPage from './groupPage';
import accountPage from './accountPage';

import userForm from './userForm';

import theme from './theme';

const reducers = {
  account,
  threads,
  groups,
  posts,
  users,
  threadPage,
  groupPage,
  accountPage,
  userForm,
  theme,
};

export default reducers;

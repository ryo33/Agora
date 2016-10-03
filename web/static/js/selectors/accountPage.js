export const getAccountUsers = ({ account, users }) => {
  return account.users.map(id => users[id]).filter(u => u != null);
};

export const getAccountUserIDs = ({ account }) => {
  return account.users;
};

export const getAccountWatchlists = ({ account }) => {
  return account.watchlists;
};

export const getCurrentUser = (state) => state.account.currentUser;

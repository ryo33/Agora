export const getAccountUsers = ({ account, users }) => {
  if (account.users) {
    return account.users.map(id => users[id]).filter(user => user != null);
  } else {
    return [];
  }
};

export const getCurrentUser = (state) => state.account.currentUser;

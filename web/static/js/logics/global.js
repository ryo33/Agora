import { createLogic } from 'redux-logic';

import {
  startLoading, finishLoading,
  startApp
} from 'actions/global';
import {
  updateAccountUsers,
  openAccountGroupsPage, updateGroups as updateAccountGroups,
  openAccountThreadsPage, updateThreads as updateAccountThreads,
  openAccountWatchlistsPage, updateWatchlists as updateAccountWatchlists,
  openAccountWebhooksPage, updateWebhooks as updateAccountWebhooks,
} from 'actions/accountPage';
import {
  openAllGroupsPage, updateGroups,
  openGroupThreadsTab, updateGroupThreads,
  openGroupGroupsTab, updateGroupGroups,
} from 'actions/groupPage';
import {
  openThreadPage, updateThreadPosts,
  openAllThreadsPage, updateThreads,
  openThreadWebhooksPage, updateWebhooks as updateThreadWebhooks,
} from 'actions/threadPage';
import {
  openWatchlistPage, updateWatchlistItems
} from 'actions/watchlistPage';
import {
  openAllWebhooksPage, updateWebhooks
} from 'actions/webhookPage';

const pairs = [
  [startApp, updateAccountUsers],
  [openAccountGroupsPage, updateAccountGroups],
  [openAccountThreadsPage, updateAccountThreads],
  [openAccountWatchlistsPage, updateAccountWatchlists],
  [openAccountWebhooksPage, updateAccountWebhooks],
  [openAllGroupsPage, updateGroups],
  [openGroupThreadsTab, updateGroupThreads],
  [openGroupGroupsTab, updateGroupGroups],
  [openThreadPage, updateThreadPosts],
  [openAllThreadsPage, updateThreads],
  [openThreadWebhooksPage, updateThreadWebhooks],
  [openWatchlistPage, updateWatchlistItems],
  [openAllWebhooksPage, updateWebhooks],
];

function createLoading(pairs) {
  const logics = [];
  pairs.forEach(([start, finish]) => {
    const startLogic = createLogic({
      type: start.getType(),
      process({ action }, dispatch) {
        dispatch(startLoading());
      }
    });
    const finishLogic = createLogic({
      type: finish.getType(),
      process({ action }, dispatch) {
        dispatch(finishLoading());
      }
    });
    logics.push(startLogic, finishLogic);
  });
  return logics;
}

export default createLoading(pairs);

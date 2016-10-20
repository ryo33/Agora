import { createReducer } from 'redux-act';

import { openThreadPage } from 'actions/threadPage';
import { openGroupPage } from 'actions/groupPage';
import { openWatchlistPage } from 'actions/watchlistPage';

const MAX_HISTORY_COUNT = 5;

function createHistoryReducer(open) {
  return createReducer({
    [open]: (state, id) => {
      let newState = state.concat();
      const index = newState.indexOf(id);
      if (index != -1) {
        newState.splice(index, 1);
      }
      newState.unshift(id);
      return newState.slice(0, MAX_HISTORY_COUNT);
    },
  }, []);
}

export const threadHistory = createHistoryReducer(openThreadPage);
export const groupHistory  = createHistoryReducer(openGroupPage);
export const watchlistHistory  = createHistoryReducer(openWatchlistPage);

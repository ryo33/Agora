import { createReducer } from 'redux-act';

import { showInfo, closeInfo } from 'actions/global';

export const globalInfo = createReducer({
  [showInfo]: (_, info) => info,
  [closeInfo]: (_, __) => null
}, null);

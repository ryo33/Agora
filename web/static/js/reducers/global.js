import { createReducer } from 'redux-act';

import { showInfo, closeInfo, startLoading, finishLoading } from 'actions/global';

export const globalInfo = createReducer({
  [showInfo]: (_, info) => info,
  [closeInfo]: (_, __) => null
}, null);

export const isLoading = createReducer({
  [startLoading]: (state, __) => state + 1,
  [finishLoading]: (state, __) => state <= 0 ? 0 : state - 1
}, 0);

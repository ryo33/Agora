import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogicMiddleware } from 'redux-logic';
import createSagaMiddleware from 'redux-saga';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore, routerReducer } from 'react-router-redux';
import createLogger from 'redux-logger';
import { persistStore, getStoredState } from 'redux-persist';

import { Application } from './components';
import { Home } from './components/pages/home';
import {
  Account, UserList, WebhookList,
  AccountThreads, AccountGroups, AccountWatchlists,
  AddUser, AddThread, AddGroup, AddWatchlist, AddWebhook,
} from 'components/pages/account/index';
import { ThreadPage, ThreadAll, Thread, ThreadWebhooks } from 'components/pages/thread';
import { PostPage, Post } from 'components/pages/post';
import { UserPage, User } from 'components/pages/user';
import { WatchlistPage, Watchlist } from 'components/pages/watchlist';
import {
  GroupPage, GroupAll, Group,
  GroupGroups, GroupThreads, GroupMembers
} from 'components/pages/group';
import { WebhookPage, WebhookAll, Webhook } from 'components/pages/webhook';
import SignIn from './components/SignIn';
import Unimplemented from 'components/Unimplemented';

import { joinAccountChannel, joinCommonChannel } from 'socket';
import { startApp } from 'actions/global';
import { switchGroupPageTabs } from 'actions/groupPage';
import { updateCurrentUser } from 'actions/accountPage';
import reducers from 'reducers';
import rootSaga from 'sagas';
import logics from 'logics';

import { signedIn } from 'global';
import { accountChannel } from 'socket';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const sagaMiddleware = createSagaMiddleware();
const logicMiddleware = createLogicMiddleware(logics);

const middlewares = [sagaMiddleware, logicMiddleware, routerMiddleware(browserHistory)]
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger();
  middlewares.push(logger);
}

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  applyMiddleware(...middlewares)
);
const history = syncHistoryWithStore(browserHistory, store);
sagaMiddleware.run(rootSaga, store.getState);

store.dispatch(startApp());
joinCommonChannel(store.dispatch);
if (signedIn) {
  joinAccountChannel(store.dispatch);
}

// Persist
const persistConfig = {
  whitelist: ['account'],
}
persistStore(store, persistConfig);
getStoredState(persistConfig, (err, state) => {
  if (state.account) {
    if (state.account.currentUser) {
      if (signedIn) {
        const user = state.account.currentUser;
        store.dispatch(updateCurrentUser(user));
        accountChannel.push('set_current_user', user);
      }
    }
  }
});

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Application}>
        <IndexRoute component={Home}/>
        <Route path="account" component={Account}>
          <Route path="users" component={UserList} />
          <Route path="threads" component={AccountThreads} />
          <Route path="groups" component={AccountGroups} />
          <Route path="watchlists" component={AccountWatchlists} />
          <Route path="thread-webhooks" component={WebhookList} />
          <Route path="add-user" component={AddUser} />
          <Route path="add-thread" component={AddThread} />
          <Route path="add-group" component={AddGroup} />
          <Route path="add-watchlist" component={AddWatchlist} />
          <Route path="add-webhook" component={AddWebhook} />
          <Route path="notifications" component={Unimplemented} />
        </Route>
        <Route path="threads" component={ThreadPage}>
          <IndexRoute component={ThreadAll}/>
          <Route path=":id/webhooks" component={ThreadWebhooks} />
          <Route path=":id" component={Thread} />
        </Route>
        <Route path="watchlists" component={WatchlistPage}>
          <Route path=":id" component={Watchlist} />
        </Route>
        <Route path="thread-webhooks" component={WebhookPage}>
          <IndexRoute component={WebhookAll}/>
          <Route path=":id" component={Webhook} />
        </Route>
        <Route path="groups" component={GroupPage}>
          <IndexRoute component={GroupAll}/>
          <Route path=":id" component={Group}>
            <IndexRoute component={GroupThreads} onEnter={() =>
              store.dispatch(switchGroupPageTabs('threads'))} />
            <Route path="threads" component={GroupThreads} onEnter={() =>
              store.dispatch(switchGroupPageTabs('threads'))} />
            <Route path="groups" component={GroupGroups} onEnter={() =>
              store.dispatch(switchGroupPageTabs('groups'))} />
            <Route path="members" component={GroupMembers} onEnter={() =>
              store.dispatch(switchGroupPageTabs('members'))} />
          </Route>
        </Route>
        <Route path="posts" component={PostPage}>
          <Route path=":id" component={Post} />
        </Route>
        <Route path="users" component={UserPage}>
          <Route path=":id" component={User} />
        </Route>
        <Route path="signin" component={SignIn} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('container')
);
